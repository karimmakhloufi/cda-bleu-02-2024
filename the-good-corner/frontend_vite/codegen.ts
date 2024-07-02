import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://backend:4000",
  documents: ["src/graphql/*.ts"],
  generates: {
    "./src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
