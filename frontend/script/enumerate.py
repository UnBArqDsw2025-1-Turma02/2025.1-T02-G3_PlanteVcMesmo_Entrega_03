import json

# filepath: /home/caio/Public/projects/ads/t3/2025.1-T02-G3_PlanteVcMesmo_Entrega_03/frontend/script/products.json
# Carregar o arquivo JSON
with open('products.json', 'r', encoding='utf-8') as file:
    products = json.load(file)

# Adicionar o campo 'id' a cada produto
for index, product in enumerate(products, start=1):
    product['id'] = index

# Salvar o JSON atualizado no mesmo arquivo
with open('products.json', 'w', encoding='utf-8') as file:
    json.dump(products, file, ensure_ascii=False, indent=4)

print("IDs adicionados com sucesso!")