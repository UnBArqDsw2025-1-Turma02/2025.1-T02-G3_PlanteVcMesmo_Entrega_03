from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time
import os

# Configuração do WebDriver
driver = webdriver.Chrome()  # Certifique-se de ter o ChromeDriver instalado e configurado
driver.get("https://www.plantei.com.br/")
wait = WebDriverWait(driver, 10)

# Nome do filtro a ser clicado (especifique aqui)
filter_name_to_click = "Substratos"  # Substitua pelo nome do filtro desejado

# Carrega os dados existentes do JSON, se o arquivo já existir
json_file_path = "products.json"
if os.path.exists(json_file_path):
    with open(json_file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
else:
    data = []

try:
    # Localiza todas as tags <a> dentro da <nav class="main-menu">
    nav_menu = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "main-menu")))
    filter_links = nav_menu.find_elements(By.TAG_NAME, "a")

    # Procura o link com o nome especificado
    for link in filter_links:
        if link.text.strip() == filter_name_to_click:
            # Role até o elemento antes de clicar
            driver.execute_script("arguments[0].scrollIntoView(true);", link)
            time.sleep(1)  # Aguarda um momento para garantir que o elemento está visível

            # Verifica se o elemento está visível e clicável
            if link.is_displayed():
                ActionChains(driver).move_to_element(link).click(link).perform()
                time.sleep(3)  # Aguarda o carregamento da página

                # Localiza a div com os produtos
                try:
                    showcase_slider = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "showcase__slider")))
                    product_elements = showcase_slider.find_elements(By.CLASS_NAME, "showcase__slide")

                    # Limita a 30 produtos por filtro
                    product_count = 0

                    # Itera sobre os produtos e coleta os dados
                    for product in product_elements:
                        if product_count >= 30:
                            break  # Para após coletar 30 produtos

                        try:
                            title = product.find_element(By.TAG_NAME, "h2").text.strip()
                            price = product.find_element(By.CLASS_NAME, "product__price--regular").text.strip()
                            image_src = product.find_element(By.TAG_NAME, "img").get_attribute("src")
                            product_link = product.find_element(By.CLASS_NAME, "product__image-outline").find_element(By.TAG_NAME, "a").get_attribute("href")

                            # Adiciona os dados ao JSON
                            data.append({
                                "filter": filter_name_to_click,
                                "title": title,
                                "price": price,
                                "image": image_src,
                                "link": product_link
                            })

                            product_count += 1
                        except Exception as e:
                            print(f"Erro ao coletar dados de um produto: {e}")
                except Exception as e:
                    print(f"Erro ao acessar os produtos do filtro '{filter_name_to_click}': {e}")
            else:
                print(f"Elemento '{filter_name_to_click}' não está visível ou interagível.")
            break
    else:
        print(f"Filtro '{filter_name_to_click}' não encontrado na navegação.")

finally:
    # Salva os dados no arquivo JSON (adicionando ao existente)
    with open(json_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    # Encerra o WebDriver
    driver.quit()

print(f"Scraping concluído para o filtro '{filter_name_to_click}'. Dados salvos em '{json_file_path}'.")