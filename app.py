from flask import Flask, render_template, Response, request, jsonify
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    pipeline,
    logging,
)
import torch
import random
from huggingface_hub import login

'''
Uncomment this for login and get llama model kub***
hf_token    = 'Place Your Token kub (in case you use local model kub)'
# login(token = hf_token) 

base_model = "meta-llama/Meta-Llama-3.1-8B-Instruct" # Placeholder for actual model

model = AutoModelForCausalLM.from_pretrained(
    base_model,
    #quantization_config=bnb_config,
    torch_dtype= torch.float16,
    load_in_8bit=False,
    device_map="auto",
    attn_implementation="eager",
) # Placeholder for actual model
'''

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_response():
    data = request.get_json()
    print(data)
    '''
        Imprement Text Generate Kub
    '''
    # Process the message, generate a response
    greetings = ["Hello!", "Hi there!", "Hey!", "Greetings!"]
    response = random.choice(greetings)  # Placeholder for actual response generation logic
    print(response)
    return jsonify(response)

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # --host 0.0.0.0 --port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
