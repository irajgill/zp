"use client"

import { Aptos, AptosConfig, type Network } from "@aptos-labs/ts-sdk"
import { useMemo } from "react"
import { APTOS_NETWORK } from "@/lib/constants"

export function useAptosClient() {
  const client = useMemo(() => {
    const config = new AptosConfig({
      network: APTOS_NETWORK as Network,
    })
    return new Aptos(config)
  }, [])

  return client
}
