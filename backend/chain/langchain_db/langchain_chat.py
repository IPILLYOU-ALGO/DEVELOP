import os
from langchain_community.chat_models import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.schema import SystemMessage, HumanMessage
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.prompts import ChatPromptTemplate
from langchain.chains import ConversationChain




os.environ["OPENAI_API_KEY"] = "openAiKey"

# ---------------------------------------------------------------
# chromaDB 읽어오기
# 경로설정
persist_directory = './chain/langchain_p311/langchain_db/db_medicine_mutual'
embedding = OpenAIEmbeddings()
# vectordb불러오기
vectordb = Chroma(
    persist_directory=persist_directory,
    embedding_function=embedding
)

# ---------------------------------------------------------------

# llm 모델 설정
llm = ChatOpenAI(
    temperature=0,
    model_name='gpt-3.5-turbo',
)

retriever = vectordb.as_retriever(search_kwargs={'k':3})


# ---------------------------------------------------------------
# 템플레이트 임시저장소 --------------------------
# 질문한 2가지 약에 대한 상호작용에 대해서만 대답해줘.
# 상호작용이 없는 경우에는 "상호작용이 없습니다"라고 말해줘.
# 상호작용이 있는 경우에는 상호작용이 없는 경우에는 "상호 작용이 없습니다 라고 말씀드립니다."라고 출력하지 말 것.
# 

template = """약사가 환자에게 설명하듯이 쉽게 설명해줘. 
            / 글자수는 200자 이내로 해줘.
        {context}
        {question}"""

QA_CHAIN_PROMPT = PromptTemplate.from_template(template)


# 랭체인 타입 선언
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,  # llm 선언
    chain_type='stuff',
    chain_type_kwargs={"prompt": QA_CHAIN_PROMPT},  # 프롬프트 지정
    retriever=retriever,  # 검색범위 선언
    return_source_documents=True,
)

# llm_response에서 필요한 부분만 출력해주는 함수
# 단순 출력에 관한 내용만 있는 함수이다.
def process_llm_response(llm_response):
    msg = '<AI 응답>\n'
    msg = msg + llm_response['result'] + '\n'
        
    return msg


# 랭체인에 질문을 전달하여 대답을 받아오고 위 함수를 통해서 나온다.
def openai_chat_ai(message):

    llm_response = qa_chain({"query": message})
    msg = process_llm_response(llm_response)
    
    return msg


if __name__ == "__main__":

    inputMsg = "디크리핀서방정과 에이알비에스정의 상호작용에 대해서 알려줘."
    outputMsg = openai_chat_ai(inputMsg)
    print(outputMsg)
