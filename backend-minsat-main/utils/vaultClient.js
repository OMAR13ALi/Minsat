// utils/vaultClient.js
import vault from 'node-vault';
import 'dotenv/config';

const vaultClient = vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR|| 'http://minsat-vault:8200',
  token: process.env.VAULT_TOKEN,
});


export default vaultClient;
