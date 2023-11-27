import pandas as pd
import json
import os

def list_culture_season():
    cities = pd.read_csv(os.path.join(os.path.dirname(__file__), 'database/dados_cidades.csv'))
    cultures = pd.read_csv(os.path.join(os.path.dirname(__file__), 'database/dados_culturas.csv'))

    season_column = cities['estacao_do_ano'].unique()
    culture_column = cultures['cultura']

    result = {
        'season': season_column.tolist(),
        'culture': culture_column.tolist()
    }

    return json.dumps(result)
