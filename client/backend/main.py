from moralis import evm_api
import creds
from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def process_wallet_history(data):
    balance_dict = defaultdict(float)
    balance_history = []

    # Sort transactions by timestamp (oldest first)
    sorted_transactions = sorted(data['result'], key=lambda x: x['block_timestamp'])

    for transaction in sorted_transactions:
        timestamp = datetime.fromisoformat(transaction['block_timestamp'].replace('Z', '+00:00'))
        date = timestamp.date()

        # Process ERC20 transfers
        for transfer in transaction['erc20_transfers']:
            if transfer['direction'] == 'receive':
                balance_dict[transfer['address']] += float(transfer['value'])
            elif transfer['direction'] == 'send':
                balance_dict[transfer['address']] -= float(transfer['value'])

        # Calculate total balance for this date
        total_balance = sum(balance_dict.values())
        
        balance_history.append({
            "date": date.isoformat(),
            "balance": total_balance
        })

    return balance_history  # Allow CORS for all routes

@app.route('/api/wallet-history')
def get_wallet_history():
    address = request.args.get('address')
    from_date = request.args.get('from_date')
    if not address:
        return jsonify({"error": "No address provided"}), 400
    
    date_today = str(datetime.datetime.now().isoformat())
    
    params = {
        "chain": "eth",
        "order": "DESC",
        "address": address,
        "to_date": "2024-09-018",
        "from_date": from_date,
        "include": "percent_change"
    }
    try:
        result = evm_api.wallets.get_wallet_history(
            api_key=creds.api_key,
            params=params,
        )
        
        # Process the result to create balance vs time array
        balance_history = process_wallet_history(result)
        
        return jsonify({
            "original_data": result,
            "balance_history": balance_history
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def main():
    return {"members":["member0", "member2", "member3"]}

@app.route('/api/wallet-balance', methods=['POST', 'OPTIONS'])
def get_current_balance():
    address = request.args.get('address')
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        tokens = request.json.get('tokens', [])
        
        body = {
            "tokens": [{"token_address": token['address']} for token in tokens]
        }
        
        params = {
            "chain": "eth",
            "include": "percent_change"
        }
        
        result = evm_api.token.get_multiple_token_prices(
            api_key=creds.api_key,
            body=body,
            params=params,
        )
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while fetching token prices"}), 500

@app.route('/api/getTokenPrices', methods=['POST', 'OPTIONS'])
def get_token_prices():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        tokens = request.json.get('tokens', [])
        
        body = {
            "tokens": [{"token_address": token['address']} for token in tokens]
        }
        
        params = {
            "chain": "eth",
            "include": "percent_change"
        }
        
        result = evm_api.token.get_multiple_token_prices(
            api_key=creds.api_key,
            body=body,
            params=params,
        )
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while fetching token prices"}), 500

@app.route('/api/wallet-net-worth')
def get_wallet_net_worth():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "No address provided"}), 400

    params = {
        "exclude_spam": True,
        "exclude_unverified_contracts": True,
        "address": address
    }

    try:
        result = evm_api.wallets.get_wallet_net_worth(
            api_key=creds.api_key,
            params=params,
        )
        return jsonify(result)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while fetching wallet net worth"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)