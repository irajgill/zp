export const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS || "0xd5f63b6f126ec4cc12948f0a5b6418d146776353c646fa0fa573f7b6b39af2cb"
export const APTOS_NETWORK = import.meta.env.VITE_APTOS_NETWORK || "testnet"
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"
export const APTOS_NODE_URL = import.meta.env.VITE_APTOS_NODE_URL || "https://fullnode.testnet.aptoslabs.com/v1"

export const SUPPORTED_COINS = ["APT", "USDC", "USDT"] as const
export const PRIVACY_LEVELS = ["standard", "enhanced", "maximum"] as const

export const CONTRACT_FUNCTIONS = {
  DEPOSIT: `${CONTRACT_ADDRESS}::zk_private_pay_manager::deposit`,
  WITHDRAW: `${CONTRACT_ADDRESS}::zk_private_pay_manager::withdraw`,
  CONFIDENTIAL_PAYMENT: `${CONTRACT_ADDRESS}::zk_private_pay_manager::apply_confidential_payment`,
  VERIFY_ATTESTATION: `${CONTRACT_ADDRESS}::zk_payment_verifier::verify_attestation`,
  CREATE_ESCROW: `${CONTRACT_ADDRESS}::escrow_manager::create_escrow`,
  SUBMIT_PRIVATE_ORDER: `${CONTRACT_ADDRESS}::clob_connector::submit_private_order`,
} as const
