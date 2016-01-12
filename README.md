# Skrypt do liczenia znaków oraz części w wiadomości SMS
Narzędzie pozwoli na obliczenie liczby znaków pozostałych do końca aktualnej części oraz obliczenie z ilu części składa się wpisywana wiadomość.

## Przykład użycia:

W projekcie należy dodać plik **smsapi-counter.js** lub **smsapi-counter.min.js** na końcu elementu `<body>`. Przykład użycia dostępny jest także w pliku **demo.html**.

### HTML

Aktywacja polega na dodaniu odpowiednich atrybutów (`data-cv-sms-textarea` oraz `data-cv-sms-counter`) do elementów HTML: elementu `<textarea>`, 
który będzie służył do wpisywania treśći wiadomości, oraz elementu wyświetlającego liczbę znaków i części SMSa (np. `<span>`, `<div>`, `<h1`> itp.). 

```html
    <textarea data-cv-sms-textarea></textarea>
    <span data-cv-sms-counter></span>
```

Za pomocą HTML można aktywować jeden licznik na stronę. Aby aktywować większą liczbę liczników, należy użyć metody aktywacji za pomocą języka Javascript.

### Javascript

W metodzie **activate** należy podać dwa parametry: ID elementu `<textarea>`, który będzie służył do wpisywania treści wiadomości oraz ID elementu wyświetlającego liczbę znaków i części.

```javascript
    CVSMSCounter.activate('textareaID', 'counterLabelID');
```

## UWAGA!
Zalecane kodowanie to UTF-8. **Skrypt nie gwarantuje dobrego zliczania znaków, jeżeli użyte zostanie błędne kodowanie lub wiadomość będzie uzupełniania za pomocą kopiuj/wklej**. W celu zabezpieczenia się przed wysłaniem zbyt dużej liczby wiadomości można skorzystać z parametrów ***nounicode***, ***normalize***, ***max_parts***. Szczegóły dotyczące parametrów, można znaleźć w [specyfikacji SMSAPI](https://www.smsapi.pl/rest).