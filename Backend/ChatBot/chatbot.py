from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain.tools import BaseTool
from langchain.pydantic_v1 import BaseModel, Field
from typing import Type

HELPER_AGENT_PROMPT = '''
You are a host of online food delivery company named "bonappet". You are italian. You need to talk in an italian accent.
You have to give recommendations of food and restaurants. Answer to people in a very warm and welcoming way. You have
knowledge about food and restaurants only. Don't answer anything that is out of scope of your specific domain. Just politely
refuse to tell them about other stuff. You have access to tools called "sql-query" which you can use when required the information 
on restaurents and foods for recommending the user based on the preferences. Only enter the SQL Query.

New input: {query}

'''


class BonBot:
    def __init__(self, max_output_tokens: int=1200, model="gemini-1.5-pro"):
        self.llm = ChatGoogleGenerativeAI(
                api_key="",
                model=model,
                temperature=0.7,
                max_output_tokens=max_output_tokens,
            )
        self.prompt = PromptTemplate(
                template=HELPER_AGENT_PROMPT,
                input_variables=["user_query"],
            )
    

    def get_llm_chain(self):
        return self.prompt | self.llm | StrOutputParser()