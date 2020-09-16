***T-Mobile Dev Puzzle - okReads***

---

***Code review:***
***Subtask 1: Are there any problems or code smells in the app?***

* Need to Unsubscribed all subscriptions from book-search component because it causes memory leak issues.

* Relative path should not use in file. Instead of that it should create in separate constants.ts and use constants in code, while make use of it with REST API.

* For Undo actions reducer function is not implemented in reading-list.effects.ts file.

* Accessibility issues need to take care for Desktop and Mobile application.

* Considering performance of the application is very low because unused JavaScript files added in code which consumes more time to make network call.

* Best practice to write arrow functions of ES6 instead of normal functions.

* Environment variables should be configured at Environment.ts file.

***Subtask 2: Are there other improvements you would make to the app? What are they and why?***

* Relative path should not use in file. Instead of that it should create in separate constants.ts and use constants in code, while make use of it with REST API. The code is updated with constants file.

* The Same Site attribute of the Set-Cookie HTTP response header allows you to declare if your cookie should be restricted to a first-party or same-site context.Resolve this issue by updating the attributes of the cookie: Specify Same Site=None and Secure if the cookie should be sent in cross-site requests. This enables third-party use. Specify Same Site=Strict or Same Site=Lax if the cookie should not be sent in cross-site requests.

* Implemented autocomplete off for book search which will prevent to show history of previous search to display on search bar.

* Use async pipe for books subscription to an Observable which returns the latest value it has emitted. When a new value is emitted, the async pipe marks the component to be checked for changes. When the component gets destroyed, the async pipe unsubscribes automatically to avoid potential memory leaks.

* HTTP/1.1 used for binary headers, multiplexing and server push, which affecting application because HTTP/1.1 establishes individual connection which remain alive for few seconds. In contrast, use HTTP/2 is more effective because with one request, connection keeps alive for longer time that you can get all information that is needed. It creates tunnel. In addition gives many benefits like binary headers, multiplexing and server push.

***Subtask 3: Manual Accessibility issues in the app?***

* The image tag is used to specify a graphic image to be displayed on a web page. All image tags should contain an "alt" attribute. For decorative graphics, the alt attribute may be empty - alt="". An empty alt attribute tells a screen reader that the image can be ignored.

* The title attribute specifies extra information about an element. The information is most often shown as a tooltip text when the mouse moves over the element.

* Each field needs a label for the screen reader to read so the user knows what to fill in.

* Web page need to set autocomplete="off" for a search bar, because browser will autofill those fields the next time the user visits the page.

***Subtask 4: What is Improved ?***

* Relative path should not use in file. Instead of that it should create in separate constants.ts and use constants in code, while make use of it with REST API.

* Mobile View accessibility issues are resolved.

* Implemented ngRx approach to fix state management issue which makes application to achieve separation of concern approach and improve performance.

* Unsubscribed all subscriptions on ngDestroy() from book-search component, which will not cause any memory leaks issues in future.

* Used async pipe for books subscription to an Observable.
