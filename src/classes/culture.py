import pandas as pd
import os

class Culture:
    def __init__(self, name, path):
        self.name = name
        self.path = path
        self.data = pd.read_csv(path, sep='\t', index_col=0)
        self.data = self.data.fillna(0)
        self.data = self.data.astype(int)
