
# 0
**Java** (1994) och **C#** (2000) är i grunden mycket snarlika. De är båda hårt typade kompilerade språk och har klassbaserad OOP som gemensam utgångspunkt.

Microsoft designade **C#** som ett direkt svar på, och för att konkurrera med, **Java**. Då de hade något att jämföra med blev vissa saker lite bättre/mindre verbosa.

*Notera:* I **C#** inleder man, till skillnad från i **Java**, namn på metoder med stor bokstav.

*De här språken ger en säker, men lite stel, kostym för hur man bör koda.* 👔

# 1
**Java** (Sun, 1994) och **JavaScript** (Netscape, 1994) är ganska olika språk - trots det gemensamma "*Java*" i namnet som kommer från att *Sun* och *Netscape* hade ett affärssamarbete och tänkte att det skulle vara smart att marknadsföra **JavaScript** som lillasyskon till **Java**.

**JavaScript** är ett löst typat språk och hade ursprungligen ingen klassyntax.

Sedan länge (2015) finns dock klasser på plats i språket och vill man kan man skriva det väldigt traditionellt och Java-likt, minus datatypsdeklarationer, vilket vi har gjort här.

*Notera*: I JavaScript heter konstruktorn alltid *constructor* oavsett klassnamn och **this** är obligatoriskt för att nå klassmedlemmar (fält och metoder). ☕

# 2
**JavaScript** (1994) och **Python** (1991) är båda löst typade språk som kan skrivas klassbaserat, om man vill. Här gör vi det, fast det blir något längre kod än om vi skulle strunta i klasserna.

Medan **JavaScript** har en grundsyntax med curly-brackets/måsvingar för programblock, semi-kolon för radavslut (optional/om man vill) osv. som liknar **Java** och **C#**, väljer **Python** att istället använda indrag för att skilja programblock åt.

**Notera:**
* I **JavaScript** använder vi *this.methodName* för att referera till metoder i klassen. I **Python** använder vi istället *self.methodName*.
* I **Python** måste vi låta alla metoder i klassen ta emot *self* som ett första argument, men utelämnar detta argument när vi anropar dem.
* Konstruktorn i en klass heter *constructor* i **JavaScript** och <span class="init-in-py">*__init__*</span> i **Python**.
* I **Python** skriver vi *inte* **new** framför klassnamnet när vi skapar en ny instans av klassen.
* I **Python** föredrar man snake-casing, dvs. underscores, för att skilja ord åt i namn på variabeler, metoder och funktioner. I många andra språk(som **Java**, **C#** och **JavaScript**) är *camelCasing* standard. 🐫

# 3
**JavaScript** (1994) och **Python** (1991) är båda löst typade språk och har gemensamt att de är lätt att "leka" med datatyper i dem, och de kräver minimial syntax för att skapa listor, hashmaps etc.

Medan **JavaScript** har en grundsyntax med curly-brackets/måsvingar för programblock, semi-kolon för radavslut osv. som liknar **Java** och **C#**, väljer **Python** att istället använda indrag för att skilja programblock åt.

Språken kan båda användas såväl med som utan klasser - här ett exempel utan klasser i bägge språken, vilket ger kortare och mer kompakt kod.

(**Python** har på gott och ont lite större behov av typomvandlingar än JavaScript.)

*Ingen finkostym behövs, fullt ös!* 🎉

# 4
**JavaScript** är ursprungligen designat för att köra i webbläsare och komplettera **HTML** (ett märkspråk för innehåll) och **CSS** (ett regelbaserat språk för styling av element på webbsidor). Således är det naturligt att grafiska gränssnitt för JavaScript-program skapas med **HTML** och **CSS**.

**Python** har **TKinter** som sitt standardverktyg för grafiska gränssnitt. Det är ett bibliotek byggt ovanpå **TK** (ett open-source plattformsoberoende verktyg) som är **widget**-baserat, dvs. det finns olika slags grafiska element (*widgets*) - som *labels/text*, *input-fält* m.m. att välja mellan för att bygga sitt GUI.

Detta gör att angreppssättet för att bygga grafiska gränssnitt är ganska olika mellan språken. Trots det går det att skapa ett exempel, som det här, där koden är jämförbar i struktur och längd.

*4 kilobyte kod x 2 borde vara nog för alla?* 😛

# 5
*Pythons* **window handling** är aningen längre än *JavaScripts*, då *Python* behöver en funktion för att starta en s.k. *Tkinter event loop* och visa fönstret. Å andra sidan behöver JavaScript en minimal HTML-fil som startpunkt.

# 6
ironboys språkjämförelser

# 7
Denna utgåva: En BMI-kalkylator och en Att göra-lista i Java, C#, JavaScript och Python...

# 8
Klicka på en Play-knapp för att köra ett stycke kod!

# 9
Resultat

# 10
Ironboys språkjämförelser: BMI-kalkylatorn

# 11
Välj jämförelse

# 12
Här har vi en mycket enkel Att göra-lista, där man endast kan lägga till eller ta bort saker.

I **Java** använder vi oss av en *ArrayList* och i **C#** av en *List*.

Kodstrukturen i de både exemplen är mycket snarlik. 

Smärre skillnader kan dock ses i konverteringen av sträng till heltal, där C# har den behändiga *TryParse*-metoden. I Java använder vi oss istället vi oss av en enkel *regex* för att kontrollera om strängen bara innehåller siffror.

I båda språken måste vi se till att vi använder ett index som finns i listan när vi tar bort något ur en lista. Annars hade vi fått ett programkörningsfel.

# 13
Här har vi en mycket enkel Att göra-lista där man endast kan lägga till eller ta bort olika saker.

I **JavaScript** använder vi oss av en *array* och i **Python** av en *List*. Nya arrayer/listor skapas i båda språken genom att bara skriva **[]**. De är dynamiska, dvs. man kan lägga till och ta bort saker ur dem.

Kodstrukturen i de både exemplen är mycket snarlik.

**Notera**:
* Båda språken kan visa listan som numrererade rader med en snabb "oneliner" (rad 9). Dock med helt olika syntax.
* **JavaScrip** har *isNaN*-metoden ("is not a number") som kollar om en sträng *inte kan* omvandlas till nummer. **Python** har *isNumeric*-metoden som kollar om en sträng *kan* omvandlas till ett nummer. 
* **JavaScript** har ett mycket bekvämt sätt att omvandla en numerisk sträng till ett tal. Man skriver bara + framför strängen. I **Python** använder vi istället *int()*-metoden.
* När vi tar bort en sak måste vi användaa ett index som finns i listan i **Python**, annars hade vi fått ett programkörningsfel. I **JavaScript** är inte detta nödvändigt, men vi ser till att undvika minusindex. (Negativa index är tillåtna i båda språken, men används för att ta bort saker räknat från slutet av en lista, vilket vi inte vill tillåta i detta program.)