docker run --rm --name nginx-proxy -p 443:443 -v "/Users/zakg/quiz-app/nginx/certs" -v "/Users/zakg/quiz-app/nginx:/etc/nginx" nginx:latest &
