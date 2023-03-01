from nltk.sentiment import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()

'''
bail out
do for
give a boost
give a leg up
give a lift
go down the line for
go for
go to bat for
go with
grease the wheels
lend a hand
make a pitch for
open doors
put on the map
take care of"
'''
'''

draw on
'''
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
