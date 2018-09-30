import pandas as pd
import urllib.request as urllib2
import urllib.parse
import json
import api

def get_top(num):
    df = pd.read_csv('nyc-rolling-sales.csv')
    df['SALE PRICE'] = df['SALE PRICE'].replace(' -  ','0').astype(float)

    top_index = df.nlargest(num, 'SALE PRICE').index

    top_addr = []
    for i in top_index:
        top_addr.append(str(df.at[i, 'ADDRESS']) + ", " + str(df.at[i, 'ZIP CODE']))

    top_coords = []
    for loc in top_addr:
        loc = urllib.parse.quote(loc)
        url = "https://api.opencagedata.com/geocode/v1/json?q={}&key={}&language=en&pretty=1".format(loc, api.get_key())
        with urllib2.urlopen(url) as url:
            data = json.loads(url.read().decode())['results'][0]['bounds']['northeast']
            top_coords.append((data['lat'], data['lng']))
    return(top_coords)

if __name__ == '__main__':
    print(get_top(10))
