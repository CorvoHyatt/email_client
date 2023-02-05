from watchdog.events import PatternMatchingEventHandler
from watchdog.observers import Observer
import time


class Watcher:
    def __init__(self, path):
        self.observer = Observer()
        self.path = path

    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.path, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(1)
        except:
            self.observer.stop()
            print("Error")

        self.observer.join()


class Handler(PatternMatchingEventHandler):
    def __init__(self):
        super(Handler, self).__init__(
            patterns=["*.json"],
            ignore_patterns=["*.tmp"],
            ignore_directories=True,
            case_sensitive=False,
        )

    def on_created(self, event):
        print(
            "[{}] Alerta!: [{}] en: [{}] ".format(
                time.asctime(), event.event_type, event.src_path
            )
        )


if __name__ == "__main__":
    path = "."

    w = Watcher(path)
    w.run()
