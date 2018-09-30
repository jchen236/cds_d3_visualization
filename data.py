import pandas as pd

def get_top50_addr():
    df = pd.read_csv('nyc-rolling-sales.csv')
    df['SALE PRICE'] = df['SALE PRICE'].replace(' -  ','0').astype(float)

    top_50_index = df.nlargest(50, 'SALE PRICE').index

    top_50_addr = []
    for i in top_50_index:
        top_50_addr.append(df.at[i, 'ADDRESS'])
    return(top_50_addr)

if __name__ == '__main__':
    print(get_top50_addr())
