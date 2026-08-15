import json
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OFFER_PATH = ROOT / "diagnostico-ot" / "index.html"


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.attrs = []
        self.json_ld = []
        self._in_json_ld = False
        self._json_chunks = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        self.attrs.append((tag, values))
        if tag == "script" and values.get("type") == "application/ld+json":
            self._in_json_ld = True
            self._json_chunks = []

    def handle_data(self, data):
        if self._in_json_ld:
            self._json_chunks.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._in_json_ld:
            self.json_ld.append(json.loads("".join(self._json_chunks)))
            self._in_json_ld = False


class DiagnosticoOtContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = OFFER_PATH.read_text(encoding="utf-8")
        cls.parser = PageParser()
        cls.parser.feed(cls.html)
        cls.links = [
            attrs.get("href", "")
            for tag, attrs in cls.parser.attrs
            if tag == "a"
        ]

    def test_offer_page_has_required_scope_and_boundaries(self):
        for phrase in (
            "Diagnóstico Express de Resiliencia y Alertas OT",
            "15 días calendario",
            "Hasta 20 activos",
            "tres flujos críticos",
            "cuatro entrevistas",
            "Una visita",
            "no intrusiva",
            "No incluye",
            "pentesting",
            "certificación IEC 62443",
            "cambios en producción",
            "soporte 24/7",
        ):
            with self.subTest(phrase=phrase):
                self.assertIn(phrase.casefold(), self.html.casefold())

    def test_page_exposes_whatsapp_email_meeting_and_privacy_actions(self):
        self.assertTrue(any(link.startswith("https://wa.me/56945818860") for link in self.links))
        self.assertTrue(any(link.startswith("mailto:hola@redlocal.cl") for link in self.links))
        self.assertIn("#reunion", self.links)
        self.assertIn("../privacidad.html", self.links)

    def test_page_has_complete_indexable_seo_metadata(self):
        metas = {
            attrs.get("name") or attrs.get("property"): attrs.get("content")
            for tag, attrs in self.parser.attrs
            if tag == "meta"
        }
        canonicals = [
            attrs.get("href")
            for tag, attrs in self.parser.attrs
            if tag == "link" and attrs.get("rel") == "canonical"
        ]
        self.assertEqual(canonicals, ["https://redlocal.cl/diagnostico-ot/"])
        self.assertGreaterEqual(len(metas.get("description", "")), 100)
        self.assertEqual(metas.get("robots"), "index,follow,max-image-preview:large")
        self.assertEqual(metas.get("og:url"), "https://redlocal.cl/diagnostico-ot/")
        self.assertEqual(metas.get("og:type"), "website")
        self.assertTrue(self.parser.json_ld)
        self.assertEqual(self.parser.json_ld[0].get("@type"), "Service")

    def test_home_and_sitemap_link_to_offer(self):
        home = (ROOT / "index.html").read_text(encoding="utf-8")
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("./diagnostico-ot/", home)
        self.assertIn("https://redlocal.cl/diagnostico-ot/", sitemap)


if __name__ == "__main__":
    unittest.main()
