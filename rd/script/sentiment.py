from nltk.sentiment import SentimentIntensityAnalyzer
'''
sia = SentimentIntensityAnalyzer()

PositivWords = {"work","collude","conspire","cooperate","hook up","participate","coact","concert","concur","function","go","run","operate",
              "aid","back","benefits","boost","expedite","facilitate","reinforce","support","sustain","abet",
              "collaborate","further","hype","plug","puff","push","relieve","serve","stump","thump","utilize","apply",
              "exploit","employ","harness","operate","exercise","wield","manipulate"}


NegativWords = {"ignore","neglect","missuse","misapply","block","check","delay","discourag","halt","handicap","hinder","hurt","impede","injure","obstruct","prevent","stop","undermine","conceal","frustrate","hide","thwart"}

workWithDic = {}
for word in PositivWords:
    workWithDic[word] = 3

for word in NegativWords:
    workWithDic[word] = -3

sia.lexicon.update(workWithDic)
print(sia.polarity_scores("BBMap work with CoverM."))

# faire tourner "auto" la recherche de co-occurence dans une meme phrase
# Avec les phrases, triées les mots par occurences
# Ponderer à la main le resultat :')
'''


import google.protobuf
import pmc_api

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("Vamsi/T5_Paraphrase_Paws")  
model = AutoModelForSeq2SeqLM.from_pretrained("Vamsi/T5_Paraphrase_Paws")
model = model.to('cuda')

def getParaphrase(sentence, nb):
    text =  "paraphrase: " + sentence + " </s>"

    encoding = tokenizer.encode_plus(text,pad_to_max_length=True, return_tensors="pt")
    input_ids, attention_masks = encoding["input_ids"].to("cuda"), encoding["attention_mask"].to("cuda")


    outputs = model.generate(
        input_ids=input_ids, attention_mask=attention_masks,
        max_length=256,
        do_sample=True,
        top_k=120,
        top_p=0.95,
        early_stopping=True,
        num_return_sequences=nb
    )

    paraphrases = []

    for output in outputs:
        line = tokenizer.decode(output, skip_special_tokens=True,clean_up_tokenization_spaces=True)
        paraphrases.append(line)
        #print(line)
    
    return outputs

tool_name_1 = "CoverM"
tool_name_2 = "BBMap"
sentences = pmc_api.get_sentences_from_article(tool_name_1,tool_name_2)
print(sentences)

