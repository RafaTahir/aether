{
  "project": {
    "name": "Aether",
    "path": "projects/border-invest",
    "problem": "Connect global participants with verified, milestone-led projects operated by individuals and organizations"
  },
  "stack": {
    "starter": "gh:solana-foundation/templates/kit/nextjs",
    "frontend": ["Next.js", "TypeScript", "Tailwind CSS"],
    "solana": ["@solana/kit", "Wallet Standard", "devnet"],
    "skills": ["solana-dev-skill", "frontend-design-guidelines", "number-formatting"],
    "mcps": ["helius-mcp"]
  },
  "architecture": {
    "pattern": "Next.js integration-first dApp",
    "decisions": [
      "No custom Anchor program until escrow requirements are validated",
      "No mainnet or real-money commitments in the prototype",
      "PII and legal documents remain off-chain",
      "Eligibility, custody, and escrow use replaceable provider interfaces"
    ]
  },
  "defi": {
    "protocol_type": "custom",
    "program_id": "BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj",
    "security_review": "none",
    "oracle_integration": "none",
    "emergency_pause": true,
    "deployment_status": "deployed_not_integrated"
  },
  "build_status": {
    "mvp_complete": false,
    "tests_passing": true,
    "devnet_deployed": false
  }
}
