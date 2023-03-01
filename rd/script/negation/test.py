import spacy 

text = [
    "iUP-BERT works very well with LCEL.",
    "iProm-phage doesn't work at all with IPPF-FE.",
    "IPPF-FE isn't compatible with LCEL"
]

nlp = spacy.load("en_core_web_sm")
for doc in nlp.pipe(text, disable = ["tok2vec", "tagger", "parser", "attribute_ruler", "lemmatizer"]):
    print([(ent.text, ent.label_) for ent in doc.ents])