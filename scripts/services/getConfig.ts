import { ConfigRes, ExpectedExports, matches, YAML } from "../deps.ts";

const { any, string, dictionary } = matches;

const matchConfig = dictionary([string, any]);

export const getConfig: ExpectedExports.getConfig = async (effects) => {
  const config = await effects
    .readFile({
      path: "start9/config.yaml",
      volumeId: "main",
    })
    .then((x) => YAML.parse(x))
    .then((x) => matchConfig.unsafeCast(x))
    .catch((e) => {
      effects.warn(`Got error ${e} while trying to read the config`);
      return undefined;
    });
  const spec: ConfigRes["spec"] = {
    "bitcoind": {
        "type": "union",
        "name": "Bitcoin Core",
        "description": "The Bitcoin Core node for Specter to connect to",
        "tag": {
            "id": "type",
            "name": "Type",
            "description": "- Internal: The Bitcoin Core service installed to your Embassy\n- Internal Proxy: The Bitcoin Proxy service installed on your Embassy\n",
            "variant-names": {
                "internal": "Internal",
                "internal-proxy": "Internal (Bitcoin Proxy)"
            }
        },
        "default": "internal-proxy",
        "variants": {
            "internal": {
                "user": {
                    "type": "pointer",
                    "name": "RPC Username",
                    "description": "The username for the RPC user for Bitcoin Core",
                    "subtype": "package",
                    "package-id": "bitcoind",
                    "target": "config",
                    "selector": "$.rpc.username",
                    "multi": false
                },
                "password": {
                    "type": "pointer",
                    "name": "RPC Password",
                    "description": "The password for the RPC user for Bitcoin Core",
                    "subtype": "package",
                    "package-id": "bitcoind",
                    "target": "config",
                    "selector": "$.rpc.password",
                    "multi": false
                }
            },
            "internal-proxy": {
                "user": {
                    "type": "pointer",
                    "name": "RPC Username",
                    "description": "The username for the RPC user allocated to Specter",
                    "subtype": "package",
                    "package-id": "btc-rpc-proxy",
                    "target": "config",
                    "multi": false,
                    "selector": "$.users.[?(@.name == \"specter\")].name"
                },
                "password": {
                    "type": "pointer",
                    "name": "RPC Password",
                    "description": "The password for the RPC user allocated to Specter",
                    "subtype": "package",
                    "package-id": "btc-rpc-proxy",
                    "target": "config",
                    "multi": false,
                    "selector": "$.users.[?(@.name == \"specter\")].password"
                }
            }
        }
    }
}
  return {
    result: {
      config,
      spec,
    },
  };
};