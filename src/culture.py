import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.preprocessing import OneHotEncoder
import numpy as np
import json
import os

def culture(cultureName, seasonName):
    base_a = pd.read_csv(os.path.join(os.path.dirname(__file__), 'database/dados_culturas.csv'))
    base_b = pd.read_csv(os.path.join(os.path.dirname(__file__), 'database/dados_cidades.csv'))

    # Entradas (X) e saídas (y)
    X = base_b[['temperatura_maxima', 'temperatura_minima', 'tipo_de_solo_predominante']]

    # Transformar a variável categórica 'tipo_de_solo_predominante' em variáveis dummy
    X = pd.get_dummies(X, columns=['tipo_de_solo_predominante'], drop_first=True)

    y = np.zeros(len(base_b))  # Inicializar a saída com zeros

    # Input do usuário
    cultura_escolhida = cultureName
    estacao_do_ano_escolhida = seasonName

    # Filtrar a cultura selecionada para obter as condições ideais
    condicoes_ideais = base_a[base_a['cultura'] == cultura_escolhida]

    cultura_filtrada = base_a[base_a['cultura'] == cultura_escolhida]
    
    if not cultura_filtrada.empty:
        condicoes_ideais = cultura_filtrada.iloc[0]

    # Filtrar cidades da base B de acordo com a estação do ano escolhida pelo usuário
    filtro_estacao_do_ano = base_b['estacao_do_ano'] == estacao_do_ano_escolhida
    base_b_filtrada = base_b[filtro_estacao_do_ano]

    # Preencher a saída com as pontuações de similaridade
    for index, row_b in base_b_filtrada.iterrows():
        similaridade_temp_max = abs(row_b['temperatura_maxima'] - condicoes_ideais['temperatura_maxima'])
        similaridade_temp_min = abs(row_b['temperatura_minima'] - condicoes_ideais['temperatura_minima'])
        similaridade_tipo_solo = 1 if row_b['tipo_de_solo_predominante'] == condicoes_ideais['tipo_de_solo_predominante'] else 0

        # Calcular pontuação total de similaridade
        pontuacao_similaridade = 1 / (1 + similaridade_temp_max + similaridade_temp_min + (1 - similaridade_tipo_solo))

        y[index] = pontuacao_similaridade

    # Dividir o conjunto de dados em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Treinar o modelo (usando RandomForestRegressor como exemplo)
    modelo = RandomForestRegressor(n_estimators=100, random_state=42)
    modelo.fit(X_train, y_train)

    # Avaliar o desempenho do modelo com MAE e MSE
    # y_pred = modelo.predict(X_test)
    # mae = mean_absolute_error(y_test, y_pred)
    # mse = mean_squared_error(y_test, y_pred)

    # print(f"Erro Médio Absoluto (MAE) do Modelo: {mae}")
    # print(f"Erro Quadrático Médio (MSE) do Modelo: {mse}")


    # Usar o modelo para prever as pontuações de similaridade para todas as cidades
    pontuacoes_preditas = modelo.predict(X)

    # Adicionar as pontuações preditas ao DataFrame
    base_b['pontuacao_similaridade'] = pontuacoes_preditas

    # Ordenar as cidades em ordem decrescente de pontuação de similaridade
    base_b_ordenada = base_b.sort_values(by='pontuacao_similaridade', ascending=False)

    # Retornar o json correspondente a busca
    json_result = base_b_ordenada[['cidade', 'pontuacao_similaridade']].to_json(orient='records')
    return json_result
