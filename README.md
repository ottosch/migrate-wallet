# migrate-wallet

A tool to help migrate Bitcoin wallets by transferring UTXOs one-to-one to new addresses derived from the destination wallet's xpub.

## How it works

Each UTXO is sent to a unique receive address on the destination wallet. UTXOs are **not consolidated**, except when:

- They share the same address (automatic grouping)
- They are surrounded by `[` `]` brackets in the UTXO file

## Setup

### 1. Export UTXO list from Sparrow Wallet

Export your UTXO list as a CSV file. The expected format matches Sparrow's export:

```csv
Date (UTC),Output,Address,Label,Value
2024-12-14 06:40:21,7c87ca...:2,tb1qt35r...,label,0.00333454
```

To consolidate specific UTXOs into one transaction, wrap them with brackets:

```csv
[
2024-12-14 06:40:21,7c87ca...:2,tb1qt35r...,,0.00333454
2024-12-14 06:40:21,af378d...:1,tb1q5ecv...,,0.00003000
]
```

### 2. Configure `config.toml`

Fill in the following fields:

```toml
# Path to the exported UTXO CSV file
utxo_file = "your-utxos.csv"

# Network: mainnet or testnet
network = "testnet"

[source_wallet]
# Seed words of the wallet you are migrating from
seed = "word1 word2 ... word12"
# Optional BIP39 passphrase (leave empty or omit if none)
passphrase = ""

[destination_wallet]
# xpub of the receiving wallet
xpub = "tpub..."
# Address type: segwit, taproot, legacy, or p2sh
type = "segwit"
# First address index to use (default: 0)
initial_index = 0
# Max addresses to derive (default: 2000)
address_limit = 2000

[transaction]
# Fee rate in sat/vb (minimum: 0.10, default: 1)
fee_rate = 1.03
# Random fee variation in basis points (default: 0)
fee_variation = 50
```

### 3. Run

Download the binary for your platform from the [releases](../../releases) page. Place `config.toml` and your UTXO CSV file alongside the binary, then run it.

This produces two files:

- `raw-txs.txt` — raw transaction hex (one per line)
- `tx-report.txt` — summary report with fees and amounts

## Compiling from source

```bash
npm install
npm run pkg
```

## Warning

**Always verify the generated transactions before broadcasting.** This software comes with no warranty. You are solely responsible for verifying that the transactions are correct. Bugs could result in loss of funds.

## License

This project is free to use, copy, and modify. The author is not responsible for any bugs or issues that may cause financial loss. Use at your own risk.
