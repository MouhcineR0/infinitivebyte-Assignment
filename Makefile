push :
	git add .
	git commit -m "$(MSG)"
	git push origin main
build :
	@docker build -t infinitivebyte .

run :
	@docker run -d -p 3000:3000 infinitivebyte

stop :
	@docker stop $$(docker ps -qa)

rm:
	@docker rm $$(docker ps -qa)

cache:
	@docker builder prune -f