// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import { Sdk, randomPrivateKey } from "../src/etherspot";
import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the Sdk field", function () {
      const sdk = new this.hre.Sdk(randomPrivateKey())
      assert.instanceOf(
        this.hre.sdk,
        this.hre.Sdk
      );
    });
  });

});
