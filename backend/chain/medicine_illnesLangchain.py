######################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 질병정보 랭체인 구현
######################################################

from .illness_db import illness_chat


class IllnessLangchain:

    # 입력받은 병명을 전역변수에 저장
    def __init__(self, illness):
        self.illness = illness
    

    # 랭체인에 병명을 전달하여 답변을 받아온다
    def langchainDataAdd(self):
        sendData = []

        # 랭체인용 질문
        msg1 = f"{self.illness}의 원인을 설명해줘."
        msg2 = f"{self.illness}에 좋은 음식을 알려줘."
        msg3 = f"{self.illness}에 대해서 자주 궁금해하는 점에 대해서 알려줘."

        # 질문 전달해서 랭체인에서 답변을 받아온다
        for msg in [msg1, msg2, msg3]:
            output = illness_chat.openai_chat_ai(msg)
            sendData.append(output)

        self.langchainData = sendData


    def run(self):
        
        # 랭체인에 상호작용을 질문하여 저장
        self.langchainDataAdd()
        
        return self.langchainData
