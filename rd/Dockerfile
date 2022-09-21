FROM python:3.9.7-slim-bullseye
LABEL maintainer="FM <fjrmoreews@gmail.com>"
RUN apt-get update
RUN apt-get install -y vim mlocate  curl python3-pip  zip unzip ;   \
   pip install numpy --upgrade ; pip install pandas  

WORKDIR /work
RUN    chmod -R 777 /work

RUN  apt-get install -y  libcurl4-gnutls-dev librtmp-dev  graphviz
 
RUN pip install pycurl  pypath-omnipath==0.11.44
RUN pip install  rdflib   rdflib-jsonld pyrdfa3   simplified_scrapy  rdflib-orm graphviz
RUN pip install   jupyter

 
RUN pip install networkx pydot Jinja2 xsdata rdfextras

RUN pip install  typepy  owlready2 SPARQLWrapper
RUN pip install pylint
#CMD ["bash"]



 
RUN pip install ipykernel jupyterlab
 
RUN pip install nltk gensim

RUN python3 -c "import nltk ; nltk.download('punkt')"

#CMD ["jupyter", "notebook", "--port=8888", "--no-browser", "--ip=0.0.0.0", "--allow-root","--NotebookApp.token='pass'" ]
CMD ["jupyter-lab",  "--port=8888", "--no-browser", "--ip=0.0.0.0", "--allow-root","--NotebookApp.token='pass'" ]

  
