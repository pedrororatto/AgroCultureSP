import pandas as pd
import os

class Culture:
    def __init__(self):
        self.data = None

    def import_csv(self):
        file_path = os.path.join(os.path.dirname(__file__), '..', 'database', 'meu_arquivo.csv')
        self.data = pd.read_csv(file_path)

    def display_information(self):
        if self.data is None:
            print("CSV file not imported. Please call import_csv() method first.")
        else:
            for index, row in self.data.iterrows():
                city = row['CITY']
                period = row['PERIOD']
                max_climate = row['MAX_CLIMATE']
                min_climate = row['MIN_CLIMATE']
                soil = row['SOIL']
                culture = row['CULTURE']
                print(f"City: {city}, Period: {period}, Max Climate: {max_climate}, Min Climate: {min_climate}, Soil: {soil}, Culture: {culture}")

# Usage example
culture = Culture()
culture.import_csv()
culture.display_information()
