import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: ["legacy/**", ".next/**", "node_modules/**", "data/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
