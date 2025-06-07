from flask import Flask, request, jsonify, make_response
import jwt
import datetime

secret_key = 'very very secret key'

def token_required(f):
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        else:
            token = None

        if not token:
            return jsonify({'error': 'token is missing'}), 403
        try:
            
            jwt.decode(token, secret_key, algorithms="HS256")
        except Exception as error:
            return jsonify({'error': 'token is invalid/expired'})
        return f(*args, **kwargs)
    return decorated
