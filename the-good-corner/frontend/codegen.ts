import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: ["src/graphql/*.ts"],
  generates: {
    "src/generated/gql/": {
      preset: "client",
      plugins: ["typescript", "typescript-react-apollo"],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
