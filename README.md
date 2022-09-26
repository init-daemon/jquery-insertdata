# jquery-insertdata
A Simple jquery Plugin allows to insert data via html attribute
## Attibut data-jq-*
* ``data-jq-attr`` : spécifie le nom de l'attribut html cible
    * si data-jq-attr est présent, c'est que le type de donnée à insérer est de type attribut
    * sinon est de type html element
* ``data-jq-mode`` : précise l'action à affectuer:
    * append : insertion après le contenu (par défaut)
    * prepend : insertion avant le contenu
    * replace : remplace tout le contenu par le nouveau

```html insertion de contenu html
<ul data-jq-name="ul-bg" data-jq-attr="style">
    <li data-jq-name="li-content-1"></li>
    <li data-jq-name="li-content-2" data-jq-mode="prepend"></li>
    <li data-jq-name="li-content-3" data-jq-mode="replace"></li>
</ul>
<script>
    var jqData = new JQInsertData();
    jq.insert('ul-bg', 'background-image: url(' + userSession.profilePicture + ')');
    jq.insert('li-content-1', 'Contenu li numéro 1');
    jq.insert('li-content-2', 'Contenu li numéro 2');
    jq.insert('li-content-3', 'Contenu li numéro 3');
</script>
```
