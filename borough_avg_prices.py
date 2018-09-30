import pandas as pd

def get_avg_prices_for_borough():
    df = pd.read_csv('nyc-rolling-sales.csv')
    df['SALE PRICE'] = df['SALE PRICE'].replace(' -  ','0').astype(float)
    borough_means = df.groupby('BOROUGH', as_index=False)['SALE PRICE'].mean()
    borough_medians = df.groupby('BOROUGH', as_index=False)['SALE PRICE'].median()
    print(borough_means)
    print(borough_medians)

if __name__ == '__main__':
    get_avg_prices_for_borough()