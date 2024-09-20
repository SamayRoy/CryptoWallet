from moralis import evm_api
import creds
from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

date_today = str(datetime.datetime.now().isoformat())


params = {
  "chain": "eth",
  "order": "DESC",
  "address": "0xcB1C1FdE09f811B294172696404e88E658659905",
  "to_date": date_today,
  "from_date": "2021-01-01",
  
}

result = evm_api.wallets.get_wallet_history(
  api_key=creds.api_key,
  params=params,
)

print(result)