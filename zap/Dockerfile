FROM zaproxy/zap-stable

RUN ["mkdir", "/zap/wrk"]

CMD ["zap-full-scan.py","-t", "http://apigateway","-r", "report.html"]