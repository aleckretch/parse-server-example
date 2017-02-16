import bottle
from bottle import get, post, request
import convert

@get('/romaji-to-japanese')
def show_form():
	print(request.GET.romaji)
	japanese = convert.romajiToJapanese(request.GET.romaji)
	return '''\
<form action="" method="GET">
	<textarea name="romaji" cols="80" rows="5" placeholder="Enter a Romaji string (use * to switch between Hiragana and Katakana)"/>%s</textarea><br>
	<input type="submit" value="Convert!"/>
</form>
<form action="">
	<textarea name="katakana" cols="80" rows="5" placeholder="The Japanese equivalent will appear here"/>%s</textarea>
</form>''' % (request.GET.romaji, japanese)

#application=bottle.default_app()       # run in a WSGI server
#bottle.run(host='localhost', port=8080) # run in a local test server
bottle.run(server='cgi')
