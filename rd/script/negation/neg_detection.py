import spacy
import stanza
import spacy_stanza
from negspacy.negation import Negex
from negspacy.termsets import termset

nlp = spacy.load("en_core_web_sm")

#nlp.add_pipe("negex", config = {"ent_types": ["ORG", "PERSON"]})

text1 = nlp("Bio.tools doesn't work with Cypher.")

for e in text1.ents:
    print(e.text, e._.negex)

tokens = word_tokenize(sentence)