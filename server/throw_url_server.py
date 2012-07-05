import web
import webbrowser

urls = (
  '/', 'ServerIndex',
  '/throw', 'ServerThrow'
)

class ServerIndex:
  def GET(self):
    return "Hi! This is the Throw URL server"

class ServerThrow:
  def GET(self):
    params = web.input()
    if not 'url' in params:
      return "No URL provided"
    webbrowser.open(params.url)
    return "Threw " + params.url

if __name__ == "__main__":
  app = web.application(urls, globals())
  app.run()
