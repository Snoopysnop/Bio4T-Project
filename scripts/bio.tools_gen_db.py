import requests
import json


def get_json_from_url(url):
    http_response = requests.get(url)  # Get the http code of the provided url
    http_response.json()  # convert http into readable json
    return json.loads(http_response.text)  # convert the string into a json object


if __name__ == "__main__":

    entry_per_page = 10  # 10 entry for each page

    # Get the number of page
    json_main = get_json_from_url("https://bio.tools/api/t/?page=1&format=json")
    count = json_main["count"]
    nbr_page = int(count / entry_per_page)

    for page_index in range(2, nbr_page + 1):
        print("{}/{}".format(page_index, nbr_page))

        json_obj = get_json_from_url("https://bio.tools/api/t/?page={}&format=json".format(page_index + 1))
        if "list" in json_obj:
            json_main["list"].extend(json_obj["list"])

    with open('data.json', 'w') as outfile:
        json.dump(json_main, outfile)
