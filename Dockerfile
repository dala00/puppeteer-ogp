FROM node:10.15

RUN apt-get update
RUN apt-get install -y libappindicator1 fonts-liberation unzip
RUN curl -O https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome*.deb || apt update && apt-get install -f -y
RUN wget https://chromedriver.storage.googleapis.com/2.37/chromedriver_linux64.zip
RUN unzip chromedriver_linux64.zip -d /usr/local/bin/
RUN apt-get install fonts-ipafont-gothic fonts-ipafont-mincho
