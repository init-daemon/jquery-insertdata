/**
 * Represente les données
 * Depends de JQuery
 */
class JQData {

    constructor(private JQElement: any) {
        this.JQElement = JQElement;
    }

    /**
     * Permet de vérifier si l'objet JQData est de type attribut ou non
     * @param {void}
     * @return {boolean}
     */
    isAttr(): boolean {
        return this.JQElement.data('jq-attr') != undefined;
    }

    /**
     * @return {string}
     */
    name(): string {
        return this.JQElement.data('jq-name');
    }

    /**
     * Permet de retourner le nom de l'attribut cible
     * @returns {string}
     */
    attr(): string {
        if (this.isAttr())
            return this.JQElement.data('jq-attr')
        return null;
    }

    /**
     * Permet de retourner la valeur lié au nom de l'attribut cible
     * @returns {string|null}
     */
    attrValue(): string {
        var attrValue = this.JQElement.attr(this.attr());
        if (this.isAttr() && attrValue != undefined)
            return this.JQElement.attr(this.attr());
        return '';
    }

    /**
     * mode d'insertion
     * @returns {string}
     */
    mode(): string {
        var mode = this.JQElement.data('jq-mode');
        return (mode != 'prepend' && mode != 'replace') ? 'append' : mode;
    }

    element() {
        return this.JQElement;
    }

    attrIsStyle() {
        if (this.isAttr())
            return this.attr() == 'style';
        return false;
    }

}


/**
 * Collection d'objet JQData
 */
class JQDataCollection {

    protected jqDataList = new Array();

    constructor(jqName: string) {
        $('[data-jq-name="' + jqName + '"]').each((i: number, element: any) => {
            this.jqDataList.push(new JQData($(element)));
        });
    }

    /**
     * 
     * @returns {Array<JQData>}
     */
    get(): Array<JQData> {
        return this.jqDataList;
    }
}



class JQInsertData {

    insert(jqName: string, value: any) {
        var jqDataCollection = new JQDataCollection(jqName);

        jqDataCollection.get().forEach(jqData => {
            this.insertOne(jqData, value);
        });
    }

    /**
     * Permet d'inserer les données
     * @param {string} jqData
     * @param {any} value
     */
    insertOne(jqData: JQData, value: any) {
        // var jqData = new JQData($('[data-jq-name="' + data_name + '"]'));
        var attrs = [];
        if (jqData.isAttr()) {
            attrs = this.attrValues(jqData);
            switch (jqData.mode()) {
                case 'append':
                    attrs.push(value);
                    break;
                case 'prepend':
                    attrs.unshift(value);
                    break;
                case 'replace':
                    attrs = [value];
                    break;
                default:
                    break;
            }
            var attr_separator = jqData.attrIsStyle() ? ';' : ' ';
            jqData.element().attr(jqData.attr(), this.setAttrValues(attrs, attr_separator));
        } else {
            switch (jqData.mode()) {
                case 'append':
                    jqData.element().append(value);
                    break;
                case 'prepend':
                    jqData.element().prepend(value);
                    break;
                case 'replace':
                    jqData.element().empty().append(value);
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * Permet de retourner la liste des valeurs contenu dans l'attribut spécifié séparé par des espaces
     * @param {JQData} jqData
     * @param {string} attr_separator
     * @return {Array}
     */
    attrValues(jqData: JQData, attr_separator: string = ' '): Array<any> {
        attr_separator = jqData.attrIsStyle() ? ';' : attr_separator;
        if (jqData.isAttr()) {
            return jqData.attrValue().split(attr_separator).map((value) => {
                return value.trim();
            });
        }
        return [];
    }

    setAttrValues(arrayData: Array<string>, attr_separator: string = ' ') {
        return arrayData.join(attr_separator);
    }

}
