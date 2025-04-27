from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI  
from pydantic import BaseModel
import time
import os
import markdown
import re

app = FastAPI()

# Configurar CORS
origins = [
    "http://localhost:4200",
]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Configurar OpenAI
apikey = os.getenv("OPEN_API_KEY")
client = OpenAI(api_key=apikey)
ASSISTANT_ID = "asst_afzOS3JC3jY82ElS54zPWnqp"

# Thread global
global_thread_id = None

class Query(BaseModel):
    question: str

# Eliminar las referencias tipo 【...†...】
def limpiar_referencias(texto: str) -> str:
    texto_limpio = re.sub(r"【.*?†.*?】", "", texto)
    return texto_limpio


@app.post("/ask")
async def ask(query: Query):
    global global_thread_id

    try:
        # Crear un thread solo si no existe
        if global_thread_id is None:
            thread = client.beta.threads.create()
            global_thread_id = thread.id
            print(f"Nuevo thread creado: {global_thread_id}")

        # Añadir el mensaje al thread existente
        client.beta.threads.messages.create(
            thread_id=global_thread_id,
            role="user",
            content=query.question
        )

        # Ejecutar el Assistant en el thread existente
        run = client.beta.threads.runs.create(
            thread_id=global_thread_id,
            assistant_id=ASSISTANT_ID
        )
        
        # Esperar hasta que se complete
        while run.status != "completed":
            run = client.beta.threads.runs.retrieve(thread_id=global_thread_id, run_id=run.id)
            time.sleep(1)

        # Obtener la última respuesta del Assistant
        message_response = client.beta.threads.messages.list(thread_id=global_thread_id)
        messages = message_response.data
        latest_message = messages[0]  # Último mensaje

        raw_response = latest_message.content[0].text.value
        raw_response = limpiar_referencias(raw_response)
        html_response = markdown.markdown(raw_response)

        return {"response": html_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
