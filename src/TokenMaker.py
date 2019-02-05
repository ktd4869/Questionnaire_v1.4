import os
import json
import codecs

def fileReader(path):
    with open(path,'r',encoding='utf-8') as txtFile:
        txt = txtFile.read()
    return list(txt)

def tokenMaker(TXT,blogNum):
    indexOffset = 0
    wordCount = 0
    pFlag = True
    for index in range(len(TXT)):
        if(pFlag):
            TXT.insert(index+indexOffset,"<p id=p"+str(wordCount)+"><span class='token pointer' id='tok-" + blogNum + "-" + str(wordCount) + "'>")
            indexOffset += 1
            wordCount += 1
            pFlag = False
        if(index == len(TXT)):
            TXT.insert(index,"</span></p>")
            break
        if(TXT[index+indexOffset] == ' '):
            TXT.insert(index+indexOffset,"</span><span class='token pointer' id='tok-" + blogNum + "-" + str(wordCount) + "'>")
            indexOffset += 1
            wordCount += 1
        if(TXT[index+indexOffset] == '\n' and index+indexOffset+1 < len(TXT) and TXT[index+indexOffset+1] == '\n'):
            TXT.pop(index+indexOffset)
            indexOffset -= 1
        if(TXT[index+indexOffset] == '\n' and index+indexOffset+1 < len(TXT) and TXT[index+indexOffset+1] != '\n'):
            TXT.insert(index+indexOffset,"</span></p>")
            indexOffset += 1
            pFlag = True
    result = "".join(TXT)
    result = result.replace("> ",'>')
    result = result.replace(" <",'<')
    return result

def initJson():
    txtList = []
    for index in range(1,200):
        temp = {}
        temp['id'] = index
        temp['view'] = 0
        txtList.append(temp)
    
    with codecs.open('src/countControl.json','w', 'utf-8') as outf:
        outJson = json.dumps(txtList)
        outf.write(outJson)
    return txtList

if __name__ == "__main__":
    initJson()
    # files = os.listdir("200_txt")
    # for file in files:
    #     txtList = fileReader("200_txt/"+file)
    #     htmlPage = tokenMaker(txtList,file.replace('.txt',''))
    #     # print(htmlPage)
    #     with open("html/"+file.replace('.txt','')+"_txt.html",'w',encoding='utf-8',newline='') as outputHtml:
    #         outputHtml.write(htmlPage)
    
        