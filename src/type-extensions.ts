import { Sdk } from "etherspot"

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    Sdk: typeof Sdk;
    sdk: Sdk;
  }
}
