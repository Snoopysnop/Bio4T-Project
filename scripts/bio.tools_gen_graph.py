import requests
import json
import re
import matplotlib.pyplot as plt
import numpy as np


def get_json_from_url(url):
    http_response = requests.get(url)  # Get the http code of the provided url
    http_response.json()  # convert http into readable json
    return json.loads(http_response.text)  # convert the string into a json object


# create a graph which show every element with more than 1% appearance from a dict[str:{int/float}]
def plot_dict_percentage(dict_to_plot, title):
    dict_to_plot_sorted = {k: v for k, v in sorted(dict_to_plot.items(), key=lambda item: item[1],
                                                   reverse=True)}

    percentage = np.array([])
    label = np.array([])
    count_dict_key = 0
    for key in dict_to_plot_sorted:
        count_dict_key += dict_to_plot_sorted[key]
    count_other = count_dict_key
    index_key = 0

    for key in dict_to_plot_sorted.keys():

        percentage_value = dict_to_plot_sorted[key] / count_dict_key * 100

        if percentage_value < 1:
            break

        percentage = np.append(percentage, percentage_value)
        label = np.append(label, "{}".format(key))

        count_other -= dict_to_plot_sorted[key]
        index_key += 1

    percentage_value = count_other / count_dict_key * 100
    percentage = np.append(percentage, percentage_value)
    label = np.append(label, "{}".format("other"))

    plt.pie(percentage, labels=label, autopct='%1.1f%%')
    plt.title(title)
    plt.show()


def homepage_populate_dict(dict_, json_obj_):
    for index in range(len(json_obj_["list"])):
        full_url = json_obj_["list"][index]["homepage"]  # get the entry of index th tool in the current page
        # "homepage" => https://biotools.readthedocs.io/en/latest/api_usage_guide.html
        reg_url = re.search('//(.+?)/', full_url)  # strip the url
        if reg_url:
            stripped_url = reg_url.group(1)  # magic

            if stripped_url in dict_.keys():
                dict_[stripped_url] += 1
            else:
                dict_[stripped_url] = 1


def from_list_populate_dict(dict_, json_obj_, list_str):
    for index in range(len(json_obj_["list"])):
        for value in json_obj_["list"][index][list_str]:
            if value in dict_.keys():
                dict_[value] += 1
            else:
                dict_[value] = 1


def repository_populate_dict(dict_, json_obj_):
    for index in range(len(json_obj_["list"])):
        repo = False
        for value in json_obj_["list"][index]["link"]:
            if value["type"][0] == "Repository":
                repo = True
                full_url = value["url"]
                reg_url = re.search('//(.+?)/', full_url)  # strip the url
                if reg_url:
                    stripped_url = reg_url.group(1)  # magic

                    if stripped_url in dict_.keys():
                        dict_[stripped_url] += 1
                    else:
                        dict_[stripped_url] = 1
        if repo:
            if "No repository" in dict_.keys():
                dict_["No repository"] += 1
            else:
                dict_["No repository"] = 1


def input_populate_dict(dict_, json_obj_):
    for index in range(len(json_obj_["list"])):
        for f in json_obj["list"][index]["function"]:
            for o in f["output"]:
                if o["data"]["term"] in dict_.keys():
                    dict_[o["data"]["term"]] += 1
                else:
                    dict_[o["data"]["term"]] = 1




if __name__ == "__main__":

    data_dict = {}

    plot_name = "Output"

    with open('data.json', 'r') as file:
        json_obj = json.load(file)
        input_populate_dict(data_dict, json_obj)

    # print(dict_homepage_count)
    plot_dict_percentage(data_dict, plot_name)
