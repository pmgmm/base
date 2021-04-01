<?php

$_SESSION['LANGUAGE']['current'] = 'qeqweqw';
require_once '../../core/config/autoload.php';
require_once '../../core/config/base.php';

use \FWK\helpers\PageHelper;

if (!$_SESSION['USER']) {
    $_SESSION['USER'] = array();
    $_SESSION['USER']['id'] = 1;
    $_SESSION['USER']['name'] = '???';
}
$_SESSION['BREADCRUMB'] = array();

$obj_page = new PageHelper(PageHelper::FREE);
$obj_page->setSubTitle('Componentes');
$obj_page->setCoreModule(MODULE_DEVELOPMENT);
$obj_page->addScript('shield.js');
$obj_page->addScript('menu.js');
$obj_page->addScript('breadcrumb.js');
$obj_page->addScript('formbutton.js');
$obj_page->addScript('checkbox.js');
$obj_page->addScript('radiobutton.js');
$obj_page->addScript('optionbutton.js');
$obj_page->addScript('input.js');
$obj_page->addScript('select.js');
$obj_page->addScript('multiselect.js');
$obj_page->addScript('dragdropselect.js');
$obj_page->addScript('dropbutton.js');
$obj_page->addScript('button.js');
$obj_page->addScript('link.js');
$obj_page->addScript('section.js');
$obj_page->addScript('modal.js');
$obj_page->addScript('table.js');
$obj_page->addScript('messagebox.js');
$obj_page->addScript('askbox.js');
$obj_page->addScript('textarea.js');
$obj_page->addScript('box.js');
$obj_page->addScript('upload.js');
$obj_page->addScript('image.js');
$obj_page->addScript('datetime.js');
$obj_page->addScript('htabs.js');
$obj_page->addScript('ftabs.js');
$obj_page->addScript('label.js');
$obj_page->addScript('text.js');
$obj_page->addScript('treeview.js');

$obj_page->addStyleSheet('/framework/css/grid_form_data.css');

$obj_page->startContent('body');
?>

<style>
    body {
        box-sizing: border-box;
        padding: 10px;
    }

    .tplcontainer {
        display: grid;
        grid-template-rows: repeat(20, min-content);
        grid-template-columns: 100px min-content auto;
        grid-column-gap: 5px;
    }

    .tplcontainer .title {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: 1 / 4;
        background-color: #dadada;
        color: red;
        height: 30px;
    }

    .tplcontainer .component {
        align-items: center;
        margin: 5px 0px;
    }

    .tplcontainer .component.multiright {
        display: flex;
        justify-content: flex-end;
    }

    .tplcontainer .component.multileft {
        display: flex;
        justify-content: flex-start;
    }

    .tplcontainer .component.label {
        align-self: center;
        justify-self: right;
    }

    .tplcontainer .component.object {
        align-self: center;
        margin-right: 15px;
    }

    .tplcontainer .component.object.line {
        grid-column: 1 / 4;
        margin-right: 0px;
    }

    .tplcontainer .component.actions {
        align-self: center;
        justify-self: right;
    }

    .tplcontainer .component.actions.left {
        align-self: center;
        justify-self: left;
    }

    .tplcontainer .component.actions.line {
        grid-column: 1 / 4;
    }

    .tplcontainer .component.actions button {
        height: 24px;
        white-space: nowrap;
    }

    .tplcontainer .freelast2 {
        grid-column: 2 / 4;
    }
</style>

<?php

$array_menu = array();
$array_menu[] = array('id' => 'a', 'main' => true, 'value' => 'MENU-A', 'disable' => false, 'elements' => array(
    array('id' => 'a1', 'value' => 'A1 111111', 'disable' => true, 'action' => 'page', 'target' => '/ui/index.php'),
    array('id' => 'a2', 'value' => 'A2 222222', 'disable' => false, 'action' => 'menu', 'target' => 1)
));
$array_menu[] = array('id' => 'b', 'main' => true, 'value' => 'MENU-B', 'disable' => true, 'elements' => array(
    array('id' => 'b1', 'value' => 'B1 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
    array('id' => 'b2', 'value' => 'B2 222222', 'disable' => false, 'action' => 'menu', 'target' => 1),
    array('id' => 'b3', 'value' => 'B3 333333', 'disable' => false, 'action' => 'menu', 'target' => 2)
));
$array_menu[] = array('id' => 'c', 'main' => true, 'value' => 'MENU-C', 'disable' => false, 'elements' => array(
    array('id' => 'c1', 'value' => 'C1 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
    array('id' => 'c2', 'value' => 'C2 222222', 'disable' => false, 'action' => 'menu', 'target' => 1),
    array('id' => 'c3', 'value' => 'C3 333333', 'disable' => false, 'action' => 'menu', 'target' => 2)
));
$array_menu[] = array('id' => 1, 'elements' => array(
    array('id' => 11, 'value' => '11 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
    array('id' => 12, 'value' => '12 222222', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
    array('id' => 13, 'value' => '13 333333', 'disable' => false, 'action' => 'menu', 'target' => 2)
));
$array_menu[] = array('id' => 2, 'elements' => array(
    array('id' => 21, 'value' => '21 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
    array('id' => 22, 'value' => '22 222222', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
    array('id' => 23, 'value' => '23 333333', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com')
));

?>


<div>

    <fwk-messagebox id="fwk_messagebox_1" color-information="blue" color-error="red" color-success="green"></fwk-messagebox>
    <fwk-askbox id="fwk_askbox_1" color="gray"></fwk-askbox>

    <fwk-modal id="fwk_modal_1" title="Modal title" max-height="300" color="gray">
        <div slot="content">
            <table style="width: 300px; border-spacing: 0;border-collapse: collapse; color:#2e8cb8;text-align: left; white-space: nowrap">
                <tr>
                    <td>AAAAAAAAAAAAAAAAAAAA</td>
                </tr>
                <tr>
                    <td>AAAAAAAAAAAAAAAAAAAAA</td>
                </tr>
                <tr>
                    <td>AAAAAAAAAAAAAAAAAAAAA</td>
                </tr>
                <tr>
                    <td>...</td>
                </tr>
            </table>
        </div>
    </fwk-modal>

    <div class="component object line">
        <fwk-htabs template_height="20" value="3">

            <!--- TAB 1 --->

            <div slot="tab">
                <i class="fas fa-th" style="margin-right: 5px"></i>
                <fwk-label value="ÁREA"></fwk-label>
            </div>
            <div slot="content">

                <div class="tplcontainer">
                    <div class="title">MENU</div>
                    <div class="component object line">
                        <fwk-menu id="fwk_menu_1" disable="false" color="gray">
                            <div slot="content"><?= json_encode($array_menu) ?></div>
                        </fwk-menu>
                    </div>

                    <br>

                    <div class="title">BREADCRUMB</div>
                    <div class="component object line">
                        <fwk-breadcrumb id="fwk_breadcrumb_1" numbered="true" disable="false" color="blue" function="brc_click">
                            <div slot="content">[{"value":"HOME", "target":"/ui/home.php"},
                                {"value":"ORGANIZAÇÃO", "target":"", "disable":true},
                                {"value":"UTILIZADORES", "target":"/ui/admin/user/list.php", "disable":true},
                                {"value":"EDITAR UTILIZADOR", "target":"/ui/admin/user/record.php?id=1"}]
                            </div>
                        </fwk-breadcrumb>
                    </div>

                    <br>

                    <div class="title">MENU + BREADCRUMB + SHIELD + PROGRESSBAR + MODAL + MESSAGEBOX + ASKBOX + FLOAT TABS </div>
                    <div class="component actions left line">
                        <button onclick="mnu_hide();">Menu Hide</button>
                        <button onclick="mnu_show();">Menu Show</button>
                        <button onclick="brc_hide();">Breadcrumb Hide</button>
                        <button onclick="brc_show();">Breadcrumb Show</button>
                        <button onclick="brc_isHide();">Breadcrumb ? Hide</button>
                        <button onclick="shield_enable();" style="position: relative; z-index: 9999;">Shield ON</button>
                        <button onclick="shield_disable();" style="position: relative; z-index: 9999;">Shield OFF</button>
                        <button onclick="shield_progress_enable();" style="position: relative; z-index: 9999;">Progress ON</button>
                        <button onclick="shield_progress_disable();" style="position: relative; z-index: 9999;">Progress OFF</button>
                        <button onclick="modal_show();" style="position: relative; z-index: 9999;">Mostrar Modal</button>
                        <button onclick="modal_hide();" style="position: relative; z-index: 9999;">Esconder Modal</button>
                        <button onclick="modal_title();" style="position: relative; z-index: 9999;">Titulo Modal</button>
                        <button onclick="messagebox_error();">Mensagem Erro</button>
                        <button onclick="messagebox_success();">Mensagem Sucesso</button>
                        <button onclick="messagebox_information();">Mensagem Informação</button>
                        <button onclick="askbox_question();">Pergunta</button>
                        <button onclick="fts_hide();">Tabs Hide</button>
                        <button onclick="fts_show();">Tabs Show</button>
                        <button onclick="fts_isHide();">Tabs ? Hide</button>
                        <button onclick="fts_hideTab();">Tab Hide</button>
                        <button onclick="fts_showTab();">Tab Show</button>
                        <button onclick="fts_isTabHide();">Tab ? Hide</button>
                        <button onclick="fts_value();">Tabs Valor</button>
                        <button onclick="fts_select();">Tabs Seleccionar</button>
                        <button onclick="fts_counter();">Tabs Contador</button>
                    </div>

                    <br>

                    <div class="title">SECTION</div>
                    <div class="component object line">
                        <fwk-section id="fwk_section_1" value="" min-height="200" max-height="300" open="true" disable="false" align="right" color="gray">
                            <i slot="icon" class="fas fa-user-cog"></i>
                            <div slot="content" class="grid-structure no-padding">
                                <div class="one-column">
                                    <div class="grid-column small-row-gap">
                                        <div class="grid-row">
                                            <fwk-label value="Componente:"></fwk-label>
                                            <fwk-input type="text" placeholder="Placeholder" maxlength="50" width="250"></fwk-input>
                                        </div>
                                        <div class="grid-row">
                                            <fwk-label value="Componente:"></fwk-label>
                                            <fwk-select key-value="value" key-text="description" placeholder="Placeholder" width="150">
                                                <div slot="options">[{"value": 1, "description":"Opção 1"},{"value": 2, "description":"Opção 2"}]</div>
                                            </fwk-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fwk-section>
                    </div>
                    <div class="component actions line">
                        <button onclick="sct_hide();">Hide</button>
                        <button onclick="sct_show();">Show</button>
                        <button onclick="sct_isHide();">? Hide</button>
                        <button onclick="sct_open();">Abre</button>
                        <button onclick="sct_close();">Fecha</button>
                        <button onclick="sct_load();">Texto</button>
                    </div>

                    <br>

                    <div class="title">BOX</div>
                    <div class="component label">
                        <fwk-label id="fwk_box_1_label" value="Box"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-box id="fwk_box_1" color="gray">
                            <div slot="content">
                                <fwk-label id="fwk_box_1_label" value="qwqweqeqwe"></fwk-label>
                                <fwk-input style="padding-bottom: 10px" type="text" placeholder="placeholder text" mandatory="true" maxlength="10" value="" width="250"></fwk-input>
                                <fwk-label id="fwk_box_1_label" value="qwqweqeqwe"></fwk-label>
                                <fwk-input type="text" placeholder="placeholder text" maxlength="10" mandatory="true" value="" width="250"></fwk-input>
                            </div>
                        </fwk-box>
                    </div>
                    <div class="component actions">
                        <button onclick="box_hide();">Hide</button>
                        <button onclick="box_show();">Show</button>
                        <button onclick="box_isHide();">? Hide</button>
                    </div>

                    <div class="title">HTABS</div>
                    <div></div>
                    <div class="component object">
                        <fwk-htabs id="fwk_htabs_1" value="a" border="true" min-height="150" max-height="300" template_height="235" align="left" color="gray">
                            <div slot="tab" id="a">
                                <i class="fas fa-th" style="margin-right: 5px"></i>
                                <fwk-label value="TAB A"></fwk-label>
                                <fwk-text class="counter" color="blue"><span slot="content">(0)</span></fwk-label>
                            </div>
                            <div slot="content" id="a">
                                <div class="grid-structure one-column">
                                    <div class="grid-column small-row-gap">
                                        <div class="grid-row">
                                            <fwk-label value="Componente:"></fwk-label>
                                            <fwk-input type="text" placeholder="Placeholder" maxlength="50" width="250"></fwk-input>
                                        </div>
                                        <div class="grid-row">
                                            <fwk-label value="Componente:"></fwk-label>
                                            <fwk-select key-value="value" key-text="description" placeholder="Placeholder" width="150">
                                                <div slot="options">[{"value": 1, "description":"Opção 1"},{"value": 2, "description":"Opção 2"}]</div>
                                            </fwk-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot="tab" id="b" hide="true">
                                <i class="fas fa-th" style="margin-right: 5px"></i>
                                <fwk-label value="TAB B"></fwk-label>
                                <fwk-text class="counter" color="blue"><span slot="content">(0)</span></fwk-text>
                            </div>
                            <div slot="content" id="b">
                                componentes tab b
                            </div>
                            <div slot="tab" id="c">
                                <i class="fas fa-th" style="margin-right: 5px"></i>
                                <fwk-label value="TAB C"></fwk-label>
                                <fwk-text class="counter" color="blue"><span slot="content">(0)</span></fwk-text>
                            </div>
                            <div slot="content" id="c">
                                componentes tab c
                            </div>
                        </fwk-htabs>
                    </div>
                    <div class="component actions">
                        <button onclick="hts_hide();">Hide</button>
                        <button onclick="hts_show();">Show</button>
                        <button onclick="hts_isHide();">? Hide</button>
                        <button onclick="hts_hideTab();">Tab Hide</button>
                        <button onclick="hts_showTab();">Tab Show</button>
                        <button onclick="hts_isTabHide();">Tab ? Hide</button>
                        <button onclick="hts_value();">Valor</button>
                        <button onclick="hts_select();">Seleccionar</button>
                        <button onclick="hts_counter();">Contador</button>
                    </div>


                    <div class="title">FTABS</div>
                    <div></div>
                    <div class="component object">
                        <fwk-ftabs id="fwk_ftabs_1" value="c" top="400" min-width="350" min-height="200" max-height="300" color="gray">
                            <div slot="tab" id="a">
                                <i class="fas fa-th" style="margin-right: 5px"></i>
                                <fwk-label value="TAB A"></fwk-label>
                                <fwk-text class="counter" color="blue"><span slot="content">(0)</span></fwk-label>
                            </div>
                            <div slot="content" id="a">
                                <div class="grid-structure one-column">
                                    <div class="grid-column small-row-gap">
                                        <div class="grid-row">
                                            <fwk-label value="Componente:"></fwk-label>

                                            <fwk-input type="text" placeholder="Placeholder" maxlength="50" width="250"></fwk-input>
                                        </div>
                                        <div class="grid-row">
                                            <fwk-label value="Componente:"></fwk-label>

                                            <fwk-select key-value="value" key-text="description" placeholder="Placeholder" width="150">
                                                <div slot="options">[{"value": 1, "description":"Opção 1"},{"value": 2, "description":"Opção 2"}]</div>
                                            </fwk-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot="tab" id="b">
                                <i class="fas fa-th" style="margin-right: 5px"></i>
                                <fwk-label value="TAB B"></fwk-label>
                                <fwk-text class="counter" color="blue"><span slot="content">(0)</span></fwk-text>
                            </div>
                            <div slot="content" id="b">
                                componentes tab b
                            </div>
                            <div slot="tab" id="c">
                                <i class="fas fa-th" style="margin-right: 5px"></i>
                                <fwk-label value="TAB C"></fwk-label>
                                <fwk-text class="counter" color="blue"><span slot="content">(0)</span></fwk-text>
                            </div>
                            <div slot="content" id="c">
                                componentes tab c
                            </div>
                        </fwk-ftabs>
                    </div>
                    <div></div>

                </div>

            </div>

            <!--- TAB 2 --->

            <div slot="tab">
                <i class="fas fa-th" style="margin-right: 5px"></i>
                <fwk-label value="SIMPLES"></fwk-label>
            </div>
            <div slot="content">
                <div class="tplcontainer">

                    <div class="title">LABEL</div>
                    <div></div>
                    <div class="component label">
                        <fwk-label id="fwk_label_1" value="Label:" color="blue" tooltip-position="right">
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-label>
                    </div>
                    <div class="component actions">
                        <button onclick="lbl_hide();">Hide</button>
                        <button onclick="lbl_show();">Show</button>
                        <button onclick="lbl_isHide();">? Hide</button>
                    </div>

                    <div class="title">TEXT</div>
                    <div></div>
                    <div class="component object">
                        <fwk-text id="fwk_text_1" color="gray">
                            <span slot="content">Este é um componente de texto.<br>Pode incluir html e assumir várias cores.</span>
                        </fwk-text>
                    </div>
                    <div class="component actions">
                        <button onclick="txt_hide();">Hide</button>
                        <button onclick="txt_show();">Show</button>
                        <button onclick="txt_isHide();">? Hide</button>
                        <button onclick="txt_value();">Valor</button>
                    </div>

                    <br>

                    <div class="title">CHECKBOX</div>
                    <div></div>
                    <div class="component object">
                        <fwk-checkbox id="fwk_checkbox_1" label="checkbox"  disable="false" value="true" tooltip-position="right" color="blue" function="chk_onchange">
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-checkbox>
                    </div>
                    <div class="component actions">
                        <button onclick="chk_hide();">Hide</button>
                        <button onclick="chk_show();">Show</button>
                        <button onclick="chk_isHide();">? Hide</button>
                        <button onclick="chk_disable();">Inactivo</button>
                        <button onclick="chk_enable();">Activo</button>
                        <button onclick="chk_isDisable();">? Inactivo</button>
                        <button onclick="chk_check();">Check</button>
                        <button onclick="chk_uncheck();">UnCheck</button>
                        <button onclick="chk_checked();">Valor</button>
                    </div>

                    <br>

                    <div class="title">RADIOBUTTON</div>
                    <div></div>
                    <div class="component object">
                        <fwk-radiobutton id="fwk_radiobutton_1" key-value="id" key-text="country" disable="true" value="2" tooltip-position="right" color="blue" function="rbt_onchange">
                            <span slot="information">INFO<br>Line 2...</span>
                            <div slot="options">[{"id": 1, "country":"Alemanha", "statistics":{"population":83019213, "gnc":435990}},
                                {"id": 2, "country":"Áustria", "statistics":{"population":8858775, "gnc":398522}},
                                {"id": 3, "country":"Bélgica", "statistics":{"population":11455519, "gnc":473639}}]
                            </div>
                        </fwk-radiobutton>
                    </div>
                    <div class="component actions">
                        <button onclick="rbt_hide();">Hide</button>
                        <button onclick="rbt_show();">Show</button>
                        <button onclick="rbt_isHide();">? Hide</button>
                        <button onclick="rbt_disable();">Inactivo</button>
                        <button onclick="rbt_enable();">Activo</button>
                        <button onclick="rbt_isDisable();">? Inactivo</button>
                        <button onclick="rbt_select();">Seleccionar</button>
                        <button onclick="rbt_unselect();">Cancelar</button>
                        <button onclick="rbt_value();">Valor</button>
                        <button onclick="rbt_selection();">Selecção</button>
                        <button onclick="rbt_data();">Dados</button>
                    </div>

                    <br>

                    <div class="title">OPTIONBUTTON</div>
                    <div class="component label"></div>
                    <div class="component object">
                        <fwk-optionbutton id="fwk_optionbutton_1" key-value="id" key-text="country" disable="true" tooltip-position="right" color="blue" value="2" function="obt_onchange">
                            <span slot="information">INFO<br>Line 2...</span>
                            <div slot="options">[{"id": 1, "country":"Alemanha", "statistics":{"population":83019213, "gnc":435990}},
                                {"id": 2, "country":"Áustria", "statistics":{"population":8858775, "gnc":398522}},
                                {"id": 3, "country":"Bélgica", "statistics":{"population":11455519, "gnc":473639}}]
                            </div>
                        </fwk-optionbutton>
                    </div>
                    <div class="component actions">
                        <button onclick="obt_hide();">Hide</button>
                        <button onclick="obt_show();">Show</button>
                        <button onclick="obt_isHide();">? Hide</button>
                        <button onclick="obt_disable();">Inactivo</button>
                        <button onclick="obt_enable();">Activo</button>
                        <button onclick="obt_isDisable();">? Inactivo</button>
                        <button onclick="obt_select();">Seleccionar</button>
                        <button onclick="obt_unselect();">Cancelar</button>
                        <button onclick="obt_value();">Valor</button>
                        <button onclick="obt_selection();">Selecção</button>
                        <button onclick="obt_data();">Dados</button>
                    </div>

                    <br>

                    <div class="title">INPUT</div>
                    <div class="component label"></div>
                    <div class="component object">
                        <fwk-label id="fwk_input_1_label" value="Input"></fwk-label>
                        <fwk-input id="fwk_input_1" placeholder="placeholder text" maxlength="50" value="2021-01-01 10:20" width="250" mandatory="true" disable="false" color="gray" tooltip-position="right">
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-input>
                    </div>
                    <div class="component actions">
                        <button onclick="in_hide();">Hide</button>
                        <button onclick="in_show();">Show</button>
                        <button onclick="in_isHide();">? Hide</button>
                        <button onclick="in_disable();">Inactivo</button>
                        <button onclick="in_enable();">Activo</button>
                        <button onclick="in_isDisable();">? Inactivo</button>
                        <button onclick="in_load();">Carregar</button>
                        <button onclick="in_clean();">Limpar</button>
                        <button onclick="in_email();">Email</button>
                        <button onclick="in_integer();">+/- Inteiro</button>
                        <button onclick="in_decimal();">+/- Decimal</button>
                        <button onclick="in_datetime();">Datetime</button>
                        <button onclick="in_date();">Date</button>
                        <button onclick="in_time();">Time</button>
                        <button onclick="in_value();">Valor</button>
                        <button onclick="in_free();">Livre</button>
                        <button onclick="in_mandatory();">Obrigatório</button>
                        <button onclick="in_isMandatory();">? Obrigatório</button>
                        <button onclick="in_validate();">Validar</button>
                        <button onclick="in_error();">Erro</button>
                        <button onclick="in_errorText();">Erro com texto</button>
                        <button onclick="in_noError();">Sem Erro</button>
                        <button onclick="in_hasError();">? Erro</button>
                    </div>

                    <br>

                    <div class="title">TEXTAREA</div>
                    <div class="component label"></div>
                    <div class="component object">
                        <fwk-label id="fwk_textarea_1_label" value="Textarea"></fwk-label>
                        <fwk-textarea id="fwk_textarea_1" placeholder="placeholder textarea" value="" maxlength="255" rows="5" min-width="250" resize="both" mandatory="true" disable="false" color="gray" tooltip-position="right">
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-textarea>
                    </div>
                    <div class="component actions">
                        <button onclick="ta_hide();">Hide</button>
                        <button onclick="ta_show();">Show</button>
                        <button onclick="ta_isHide();">? Hide</button>
                        <button onclick="ta_disable();">Inactivo</button>
                        <button onclick="ta_enable();">Activo</button>
                        <button onclick="ta_isDisable();">? Inactivo</button>
                        <button onclick="ta_load();">Carregar</button>
                        <button onclick="ta_clean();">Limpar</button>
                        <button onclick="ta_value();">Valor</button>
                        <button onclick="ta_free();">Livre</button>
                        <button onclick="ta_mandatory();">Obrigatório</button>
                        <button onclick="ta_isMandatory();">? Obrigatório</button>
                        <button onclick="ta_error();">Erro</button>
                        <button onclick="ta_errorText();">Erro com texto</button>
                        <button onclick="ta_noError();">Sem Erro</button>
                        <button onclick="ta_hasError();">? Erro</button>
                    </div>

                    <br>

                    <div class="title">DROPBUTTON</div>
                    <div class="component label"></div>
                    <div class="component object multileft">
                        <fwk-dropbutton id="fwk_dropbutton_1" style="padding-right: 10px;" value="HHH" simple="true" disable="false" min-height="100" max-height="300" border="true" body-align="right" color="gray">
                            <i slot="icon" class="fas fa-user-cog"></i>
                            <div slot="content" style="color:green;text-align: left; white-space: nowrap">
                                D1111111<br>1111111<br>zzzzzzz
                            </div>
                        </fwk-dropbutton>
                        <fwk-dropbutton id="fwk_dropbutton_2" value="Botão 2" disable="false" width="300" border="true" color="blue">
                            <i slot="icon" class="fas fa-user-cog"></i>
                            <div slot="content">
                                <fwk-checkbox id="fwk_checkbox_01" label="checkbox"  disable="false" value="true" color="blue" function="chk_onchange">

                                </fwk-checkbox>
                                <fwk-checkbox id="fwk_checkbox_02" label="checkbox"  disable="false" value="true" color="blue" function="chk_onchange">

                                </fwk-checkbox>
                                <fwk-checkbox id="fwk_checkbox_" label="checkbox"  disable="false" value="true" color="blue" function="chk_onchange">
      
                                </fwk-checkbox>
                                <div style="display: flex; justify-content: flex-end; margin-top: 10px">
                                    <fwk-formbutton color="white" id="formbutton_1617040064856_ecicohuve" value="AAAAA"></fwk-formbutton>
                                    <fwk-formbutton color="gray" id="formbutton_1617040064857_08pyl590x" style="margin-left: 7px;" value="BBBB"></fwk-formbutton>
                                </div>
                            </div>
                        </fwk-dropbutton>
                    </div>
                    <div class="component actions">
                        <button onclick="dbt_hide();">Hide</button>
                        <button onclick="dbt_show();">Show</button>
                        <button onclick="dbt_isHide();">? Hide</button>
                        <button onclick="dbt_disable();">Inactivo</button>
                        <button onclick="dbt_enable();">Activo</button>
                        <button onclick="dbt_isDisable();">? Inactivo</button>
                        <button onclick="dbt_load();">Texto</button>
                    </div>

                    <br>

                    <div class="title">BUTTON</div>
                    <div class="component label"></div>
                    <div class="component object multiright">
                        <fwk-button id="fwk_button_1" style="padding-right: 30px;" value="Modal" disable="false" border="true" color="gray" tooltip-position="right" function='{"bt_onclick_modal":[]}'>
                            <i slot="icon" class="fas fa-plus-circle"></i>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-button>
                        <fwk-button id="fwk_button_2" style="padding-right: 13px;" value="" disable="false" border="false" color="blue" function='{"bt_onclick":[]}'>
                            <svg slot="icon" viewBox="0 0 64 64">
                                <path d="M32 0C14.336 0 0 14.336 0 32C0 49.664 14.336 64 32 64C49.664 64 64 49.664 64 32C64 14.336 49.664 0 32 0ZM48 35.2H35.2V48H28.8V35.2H16V28.8H28.8V16H35.2V28.8H48V35.2Z" />
                            </svg>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-button>
                    </div>
                    <div class="component actions">
                        <button onclick="bt_hide();">Hide</button>
                        <button onclick="bt_show();">Show</button>
                        <button onclick="bt_isHide();">? Hide</button>
                        <button onclick="bt_disable();">Inactivo</button>
                        <button onclick="bt_enable();">Activo</button>
                        <button onclick="bt_isDisable();">? Inactivo</button>
                        <button onclick="bt_processing();">Em Processamento</button>
                        <button onclick="bt_noprocessing();">Sem Processamento</button>
                        <button onclick="bt_load();">Texto</button>
                    </div>

                    <br>

                    <div class="title">LINK</div>
                    <div class="component label"></div>
                    <div class="component object multiright">

                        <fwk-link id="fwk_link_1" style="padding-right: 30px;" value="LINK" disable="false" color="blue" tooltip-position="right" address='http://google.com'>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-link>
                        <fwk-link id="fwk_link_2" style="padding-right: 13px;" value="" disable="false" color="blue" tooltip-position="right" address='http://google.com'>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-link>
                    </div>

                    <div class="component actions">
                        <button onclick="lnk_hide();">Hide</button>
                        <button onclick="lnk_show();">Show</button>
                        <button onclick="lnk_isHide();">? Hide</button>
                        <button onclick="lnk_disable();">Inactivo</button>
                        <button onclick="lnk_enable();">Activo</button>
                        <button onclick="lnk_isDisable();">? Inactivo</button>
                        <button onclick="lnk_load();">Texto</button>
                        <button onclick="lnk_address();">Address</button>
                    </div>

                    <br>

                    <div class="title">FORMBUTTON</div>
                    <div class="component label"></div>
                    <div class="component object multiright">
                        <fwk-formbutton id="fwk_formbutton_1" style="padding-right: 30px;" disable="false" value="ÁÇor1" color="gray" function='{"fbt_onclick":[]}'>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-formbutton>
                        <fwk-formbutton id="fwk_formbutton_2" style="padding-right: 30px;" disable="false" value="ÁÇor2" color="blue" tooltip-position="right" function='{"fbt_onclick":[]}'>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-formbutton>
                        <fwk-formbutton id="fwk_formbutton_3" disable="false" value="ÁÇor3" color="white" function='{"fbt_onclick":[]}'>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-formbutton>
                    </div>
                    <div class="component actions">
                        <button onclick="fbt_hide();">Hide</button>
                        <button onclick="fbt_show();">Show</button>
                        <button onclick="fbt_isHide();">? Hide</button>
                        <button onclick="fbt_disable();">Inactivo</button>
                        <button onclick="fbt_enable();">Activo</button>
                        <button onclick="fbt_isDisable();">? Inactivo</button>
                        <button onclick="fbt_processing();">Em Processamento</button>
                        <button onclick="fbt_noprocessing();">Sem Processamento</button>
                        <button onclick="fbt_load();">Texto</button>
                    </div>

                    <br>

                    <div class="title">IMAGE</div>
                    <div class="component label">
                        <fwk-label id="fwk_image_1_label" class="component label" value="Image:" color="blue"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-image id="fwk_image_1" src="../../core/resources/avatars/m_avatar_1.png" width="100" circle="true" border="1" function='{"img_onclick_modal":[]}'>
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-image>
                    </div>
                    <div class="component actions">
                        <button onclick="img_hide();">Hide</button>
                        <button onclick="img_show();">Show</button>
                        <button onclick="img_isHide();">? Hide</button>
                        <button onclick="img_disable();">Inactivo</button>
                        <button onclick="img_enable();">Activo</button>
                        <button onclick="img_isDisable();">? Inactivo</button>
                    </div>

                </div>

            </div>

            <!--- TAB 3 --->

            <div slot="tab">
                <i class="fas fa-th" style="margin-right: 5px"></i>
                <fwk-label value="COMPLEXOS"></fwk-label>
            </div>
            <div slot="content">

                <div class="tplcontainer">

<?php

$treeview_config = array('filter' => true, 'actions' => true, 'bulk' => true, 'node_actions' => true, 'levels' => 3);

for ($i=1; $i<2; $i++) {

    $j='';
 $treeview_nodes[] = array(
    '_permissions' => array('xpto', 'd'), 'key' => $j.'0001', 'value' => $j.'Nó 1', 'active' => false,
    '_data' => array('last_update' => '2021-01-01')
);
$treeview_nodes[] = array(
    '_permissions' => array('u', 'd'), 'key' => $j.'00011', 'parent_key' => $j.'0001', 'value' => $j.'Nó 11', 'active' => true,
    '_data' => array('last_update' => '2021-01-01'),
);
$treeview_nodes[] = array(
    '_permissions' => array('u', 'xpto'), 'key' => $j.'00012', 'parent_key' => $j.'0001', 'value' => $j.'Nó 12', 'active' => true,
    '_data' => array('last_update' => '2021-01-01')
);
$treeview_nodes[] = array(
    '_permissions' => array('u', 'd'), 'key' => $j.'00013', 'parent_key' => $j.'0001', 'value' => $j.'Nó 13', 'active' => true,
    '_data' => array('last_update' => '2021-01-01')
);
$treeview_nodes[] = array(
    '_permissions' => array('xpto', 'd'), 'key' => $j.'2', 'value' => $j.'Nó 2', 'active' => true,
    '_data' => array('last_update' => '2021-01-01')
);
$treeview_nodes[] = array(
    '_permissions' => array('u', 'd'), 'key' => $j.'21', 'parent_key' => $j.'2', 'value' => $j.'Nó 21', 'active' => true,
    '_data' => array('last_update' => '2021-01-01'),
    '_actions' => array ('<fwk-button slot="node-action" value="Eliminar Selecionados1" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
    <svg slot="icon" viewBox="0 0 512 512">
        <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
    </svg>
</fwk-button>', 
'<fwk-button slot="node-action" value="Acção" disable="true" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
    <svg slot="icon" viewBox="0 0 512 512">
        <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
    </svg>
</fwk-button>')
    
);     
$treeview_nodes[] = array(
    '_permissions' => array('u', 'd'), 'key' => $j.'211', 'parent_key' => $j.'21', 'value' => $j.'Este nó tem accoes 211', 'active' => true,
    '_data' => array('value' => 'Nó 211'),
    '_actions' => array ('<fwk-button slot="node-action" value="Eliminar Selecionados1" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
                                <svg slot="icon" viewBox="0 0 512 512">
                                    <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
                                </svg>
                            </fwk-button>', 
                            '<fwk-button slot="node-action" value="Acção" disable="true" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
                                <svg slot="icon" viewBox="0 0 512 512">
                                    <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
                                </svg>
                            </fwk-button>')
);     


$treeview_nodes[] = array(
    '_permissions' => array('xpto', 'd'), 'key' => $j.'212', 'parent_key' => $j.'21', 'value' => $j.'Nó 2 inactivo', 'active' => false,
    '_data' => array('last_update' => '2021-01-01')
);

$treeview_nodes[] = array(
    '_permissions' => array('xpto', 'd'), 'key' => $j.'2111', 'parent_key' => $j.'211', 'value' => $j.'Nó 2', 'active' => true,
    '_data' => array('last_update' => '2021-01-01')
);
  
$treeview_nodes[] = array(
    '_permissions' => array('u', 'd'), 'key' => $j.'21111', 'parent_key' => $j.'2111', 'value' => $j.'Este nó tem accoes 211 freeze', 'freeze' => true, 'active' => false,
    '_data' => array('value' => 'Nó 211'),
    '_actions' => array ('<fwk-button slot="node-action" value="Eliminar Selecionados1" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
                                <svg slot="icon" viewBox="0 0 512 512">
                                    <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
                                </svg>
                            </fwk-button>', 
                            '<fwk-button slot="node-action" value="Acção" disable="true" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
                                <svg slot="icon" viewBox="0 0 512 512">
                                    <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
                                </svg>
                            </fwk-button>')
);   

$treeview_nodes[] = array(
    '_permissions' => array('u', 'd'), 'key' => $j.'211111', 'parent_key' => $j.'21111', 'value' => $j.'Nó 21', 'active' => true,
    '_data' => array('last_update' => '2021-01-01'),
    '_actions' => array ('<fwk-button slot="node-action" value="Eliminar Selecionados1" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
    <svg slot="icon" viewBox="0 0 512 512">
        <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
    </svg>
</fwk-button>', 
'<fwk-button slot="node-action" value="Acção" disable="true" color="blue" function=\'{"tv_function":[211, "Nó 211"]}\'>
    <svg slot="icon" viewBox="0 0 512 512">
        <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z" />
    </svg>
</fwk-button>')
);   

}
?>

                    <div class="title">TREEVIEW</div>
                    <div class="component label">
                        <fwk-label id="fwk_treeview_1_label" value="Treeview"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-treeview id="fwk_treeview_1" value="Treeview TESTE" color="gray">

                            <!-- Botões para dropdown bulk -->
                            <fwk-button slot="bulk-action" value="Ver Id's xpto" color="blue" function="tv_selected">
                            </fwk-button>

                            <!-- Configuração -->
                            <div slot="config"><?= json_encode($treeview_config) ?></div>
                            
                            <!-- Nós -->
                            <div slot="nodes"><?= json_encode($treeview_nodes, JSON_HEX_QUOT | JSON_HEX_TAG) ?></div>

                        </fwk-treeview>
                    </div>
                    <div class="component actions">
                    </div>
                
                    <br>

                    <div class="title">DATETIME</div>
                    <div class="component label">
                        <fwk-label id="fwk_datetime_1_label" class="component label" value="Datetime:" color="blue"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-datetime id="fwk_datetime_1" value="2021-02-24 10:10" week="true" time="true" placeholder="Placeholder" width="175" mandatory="true" disable="false" tooltip-position="right" color="gray">
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-datetime>
                    </div>
                    <div class="component actions">
                        <button onclick="dttm_hide();">Hide</button>
                        <button onclick="dttm_show();">Show</button>
                        <button onclick="dttm_isHide();">? Hide</button>
                        <button onclick="dttm_disable();">Inactivo</button>
                        <button onclick="dttm_enable();">Activo</button>
                        <button onclick="dttm_isDisable();">? Inactivo</button>
                        <button onclick="dttm_select();">Seleccionar</button>
                        <button onclick="dttm_unselect();">Cancelar</button>
                        <button onclick="dttm_value();">Valor</button>
                        <button onclick="dttm_datetime();">Data hora</button>
                        <button onclick="dttm_date();">Data</button>
                        <button onclick="dttm_year();">Ano</button>
                        <button onclick="dttm_month();">Mês</button>
                        <button onclick="dttm_week();">Semana</button>
                        <button onclick="dttm_day();">Dia</button>
                        <button onclick="dttm_time();">Hora/minuto</button>
                        <button onclick="dttm_hour();">Hora</button>
                        <button onclick="dttm_minute();">Minutos</button>
                        <button onclick="dttm_free();">Livre</button>
                        <button onclick="dttm_mandatory();">Obrigatório</button>
                        <button onclick="dttm_isMandatory();">? Obrigatório</button>
                        <button onclick="dttm_validate();">Validar</button>
                        <button onclick="dttm_error();">Erro</button>
                        <button onclick="dttm_errorText();">Erro com texto</button>
                        <button onclick="dttm_noError();">Sem Erro</button>
                        <button onclick="dttm_hasError();">? Erro</button>
                    </div>

                    <br>

                    <div class="title">SELECT</div>
                    <div class="component label">
                        <fwk-label id="fwk_select_1_label" class="component label" value="Select:" color="blue"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-select id="fwk_select_1" key-value="id" key-text="country" value="1" placeholder="Select Option" width="300" rows="12" filter="true" mandatory="true" disable="false" tooltip-position="right" color="blue" function="sel_onchange">
                            <span slot="information">INFO<br>Line 2...</span>
                            <div slot="options">[{"id": 1, "country":"Alemanha", "statistics":{"population":83019213, "gnc":435990}},
                                {"id": 2, "country":"Áustria", "statistics":{"population":8858775, "gnc":398522}},
                                {"id": 6, "country":"Croácia", "statistics":{"population":4076246, "gnc":53937}},
                                {"id": 7, "country":"Dinamarca", "statistics":{"population":5806081, "gnc":310576}},
                                {"id": 8, "country":"Eslováquia", "statistics":{"population":5450421, "gnc":94177}},
                                {"id": 3, "country":"Bélgica", "statistics":{"population":11455519, "gnc":473639}},
                                {"id": 4, "country":"Bulgária", "statistics":{"population":7000039, "gnc":60675}},
                                {"id": 5, "country":"Chipre", "statistics":{"population":875899, "gnc":21944}}]
                            </div>
                        </fwk-select>
                    </div>
                    <div class="component actions">
                        <button onclick="sel_hide();">Hide</button>
                        <button onclick="sel_show();">Show</button>
                        <button onclick="sel_isHide();">? Hide</button>
                        <button onclick="sel_disable();">Inactivo</button>
                        <button onclick="sel_enable();">Activo</button>
                        <button onclick="sel_isDisable();">? Inactivo</button>
                        <button onclick="sel_fillOptions();">Carregar (fill - options)</button>
                        <button onclick="sel_fillAjax();">Carregar (fill - ajax)</button>
                        <button onclick="sel_select();">Seleccionar</button>
                        <button onclick="sel_unselect();">Cancelar</button>
                        <button onclick="sel_value();">Valor</button>
                        <button onclick="sel_selection();">Selecção</button>
                        <button onclick="sel_data();">Dados</button>
                        <button onclick="sel_free();">Livre</button>
                        <button onclick="sel_mandatory();">Obrigatório</button>
                        <button onclick="sel_isMandatory();">? Obrigatório</button>
                        <button onclick="sel_error();">Erro</button>
                        <button onclick="sel_errorText();">Erro com texto</button>
                        <button onclick="sel_noError();">Sem Erro</button>
                        <button onclick="sel_hasError();">? Erro</button>
                    </div>

                    <br>

                    <div class="title">MULTISELECT</div>
                    <div class="component label">
                        <fwk-label id="fwk_multiselect_1_label" class="component label" value="Multiselect:" color="blue"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-multiselect id="fwk_multiselect_1" key-value="id" key-text="country" value='["Alemanha/xpto",2,3]' placeholder="Select Options" width="250" rows="12" filter="true" mandatory="true" disable="false" tooltip-position="right" color="gray" function="msel_onchange">
                            <span slot="information">INFO<br>Line 2...</span>
                            <div slot="options">[{"id": "Alemanha/xpto", "country":"Alemanha", "statistics":{"population":83019213, "gnc":435990}},
                                {"id": 2, "country":"Áustria", "statistics":{"population":8858775, "gnc":398522}},
                                {"id": 6, "country":"Croácia", "statistics":{"population":4076246, "gnc":53937}},
                                {"id": 7, "country":"Dinamarca", "statistics":{"population":5806081, "gnc":310576}},
                                {"id": 8, "country":"Eslováquia", "statistics":{"population":5450421, "gnc":94177}},
                                {"id": 3, "country":"Bélgica", "statistics":{"population":11455519, "gnc":473639}},
                                {"id": 4, "country":"Bulgária", "statistics":{"population":7000039, "gnc":60675}},
                                {"id": 5, "country":"Chipre", "statistics":{"population":875899, "gnc":21944}},
                                {"id": 9, "country":"Eslovénia", "statistics":{"population":2080908, "gnc":48007}},
                                {"id": 10, "country":"Espanha", "statistics":{"population":46934632, "gnc":1244757}}]
                            </div>
                        </fwk-multiselect>
                    </div>
                    <div class="component actions">
                        <button onclick="msel_hide();">Hide</button>
                        <button onclick="msel_show();">Show</button>
                        <button onclick="msel_isHide();">? Hide</button>
                        <button onclick="msel_disable();">Inactivo</button>
                        <button onclick="msel_enable();">Activo</button>
                        <button onclick="msel_isDisable();">? Inactivo</button>
                        <button onclick="msel_fillOptions();">Carregar (fill - options)</button>
                        <button onclick="msel_fillAjax();">Carregar (fill - ajax)</button>
                        <button onclick="msel_select();">Seleccionar</button>
                        <button onclick="msel_unselect();">Cancelar</button>
                        <button onclick="msel_value();">Valor</button>
                        <button onclick="msel_selection();">Selecção</button>
                        <button onclick="msel_data();">Dados</button>
                        <button onclick="msel_free();">Livre</button>
                        <button onclick="msel_mandatory();">Obrigatório</button>
                        <button onclick="msel_isMandatory();">? Obrigatório</button>
                        <button onclick="msel_error();">Erro</button>
                        <button onclick="msel_errorText();">Erro com texto</button>
                        <button onclick="msel_noError();">Sem Erro</button>
                        <button onclick="msel_hasError();">? Erro</button>
                    </div>

                    <br>

                    <div class="title">DRAGDROPSELECT</div>
                    <div class="component label">
                        <fwk-label id="fwk_dragdropselect_1_label" class="component label" value="Dragdropselect:" color="blue"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-dragdropselect id="fwk_dragdropselect_1" key-value="id" key-text="code" value="[1,202,205]" width-available="200" title-available="DISPONÍVEIS" width-selected="350" title-selected="SELECIONADOS" rows="12" filter="true" mandatory="true" disable="true" tooltip-position="right" color="gray">
                            <span slot="information">C - Adicionar<br>R - Ver<br>U - Editar<br>D - Eliminar</span>
                            <div slot="template_details">
                                <fwk-checkbox id="1" label="C" value="true" color="gray"></fwk-checkbox>
                                <fwk-checkbox id="2" label="R" value="true" color="gray"></fwk-checkbox>
                                <fwk-checkbox id="4" label="U" value="true" color="gray"></fwk-checkbox>
                                <fwk-checkbox id="8" label="D" value="true" color="gray"></fwk-checkbox>
                            </div>
                            <div slot="details">{"1":false,"205":true,"202":[true,true,true,false],"2":false,"101":false,"102":false,"101":false,"103":false,"204":true,"203":true,"3":false,"201":[true,false,true,true]}</div>
                            <div slot="options">[{"id":"1","code":"ADMINISTRATION","statistics":{"population":8858775, "gnc":398522}},{"id":"205","code":"APP_PWA"},{"id":"202","code":"GROUP"},{"id":"2","code":"MAINTENANCE"},{"id":"101","code":"MODULE_ADMINISTRATION"},{"id":"102","code":"MODULE_MAINTENANCE"},{"id":"101","code":"MODULE_ORGANIZATION"},{"id":"103","code":"MODULE_SUPPORT"},{"id":"204","code":"PERMISSION"},{"id":"203","code":"ROLE"},{"id":"3","code":"SUPPORT"},{"id":"201","code":"USER"}]</div>

                        </fwk-dragdropselect>
                    </div>

                    <div class="component actions">
                        <button onclick="ddsel_hide();">Hide</button>
                        <button onclick="ddsel_show();">Show</button>
                        <button onclick="ddsel_isHide();">? Hide</button>
                        <button onclick="ddsel_disable();">Inactivo</button>
                        <button onclick="ddsel_enable();">Activo</button>
                        <button onclick="ddsel_isDisable();">? Inactivo</button>
                        <button onclick="ddsel_fillOptions();">Carregar (fill - options)</button>
                        <button onclick="ddsel_fillAjax();">Carregar (fill - ajax)</button>
                        <button onclick="ddsel_select();">Seleccionar</button>
                        <button onclick="ddsel_unselect();">Cancelar</button>
                        <button onclick="ddsel_value();">Valor</button>
                        <button onclick="ddsel_selection();">Selecção</button>
                        <button onclick="ddsel_data();">Dados</button>
                        <button onclick="ddsel_details();">Detalhe</button>
                        <button onclick="ddsel_free();">Livre</button>
                        <button onclick="ddsel_mandatory();">Obrigatório</button>
                        <button onclick="ddsel_isMandatory();">? Obrigatório</button>
                        <button onclick="ddsel_error();">Erro</button>
                        <button onclick="ddsel_errorText();">Erro com texto</button>
                        <button onclick="ddsel_noError();">Sem Erro</button>
                        <button onclick="ddsel_hasError();">? Erro</button>
                    </div>

                    <br>

                    <div class="title">UPLOAD</div>
                    <div class="component label">
                        <fwk-label id="fwk_upload_1_label" value="Upload"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-upload id="fwk_upload_1" width="250" multifiles="true" placeholder="placeholder text" mandatory="true">
                            <span slot="information">INFO<br>Line 2...</span>
                        </fwk-upload>
                    </div>
                    <div class="component actions">
                        <button onclick="up_hide();">Hide</button>
                        <button onclick="up_show();">Show</button>
                        <button onclick="up_isHide();">? Hide</button>
                        <button onclick="up_disable();">Inactivo</button>
                        <button onclick="up_enable();">Activo</button>
                        <button onclick="up_isDisable();">? Inactivo</button>
                        <button onclick="up_value();">Valor</button>
                        <button onclick="up_free();">Livre</button>
                        <button onclick="up_mandatory();">Obrigatório</button>
                        <button onclick="up_isMandatory();">? Obrigatório</button>
                        <button onclick="up_error();">Erro</button>
                        <button onclick="up_errorText();">Erro com texto</button>
                        <button onclick="up_noError();">Sem Erro</button>
                        <button onclick="up_hasError();">? Erro</button>
                    </div>

                    <br>

<?php

$table_config = array('filter' => true, 'actions' => true, 'bulk' => true, 'row_actions' => true, 'rows' => 10);

$table_columns = array();
$table_columns['sr.name'] = array('title' => 'NOME', 'width' => 230, "order" => true);
$table_columns['sr.description'] = array('title' => 'DESCRIÇÃO', 'width' => 400, 'tooltip' => true);
$table_columns['sr.active'] = array('title' => 'ATIVO', 'width' => 60, 'align' => 'center');
$table_columns['_actions'] = array('width' => 130);


$table_rows = array();
$table_rows[] = array(
    '_permissions' => array('u', 'd'), 'key' => '101', 'values' => array('_data' => array('aaa' => 'bbb1'), 'sr.name' => 'TEST', 'sr.description' => 'Teste de funcionalidades', 'sr.active' => true),
    '_data' => array('last_update' => '2021-01-01'),
    '_actions' => array(
        '<fwk-button value="Editar" color="blue" function=\'{"editRecord":[101]}\'></fwk-button>',
        '<fwk-button value="Eliminar" color="blue" function=\'{"confirmDeleteRecord":[101,"TEXT"]}\'></fwk-button>'
    )
);
$table_rows[] = array(
    '_permissions' => array('u'), 'key' => '3', 'values' => array('_data' => array('aaa' => 'bbb2'), 'sr.name' => 'SUPPORT', 'sr.description' => 'Suporte à solução', 'sr.active' => true),
    '_data' => array('last_update' => '2021-01-01'),
    '_actions' => array(
        '<fwk-button value="Editar" color="blue" function=\'{"editRecord":[101]}\'></fwk-button>',
        '<fwk-button value="Eliminar" color="blue" function=\'{"confirmDeleteRecord":[101,"TEXT"]}\'></fwk-button>'
    )
);

?>

                    <div class="title">TABLE</div>
                    <div class="component label">
                        <fwk-label id="fwk_table_1_label" value="Table"></fwk-label>
                    </div>
                    <div class="component object">
                        <fwk-table id="fwk_table_1" color="gray">

                            <!-- Configuração -->
                            <div slot="config"><?= json_encode($table_config) ?></div>
                            <div slot="columns"><?= json_encode($table_columns) ?></div>

                            <!-- Botões de topo de tabela -->
                            <fwk-button slot="table-top-action" value="Adicionar registo" color="blue" disable="<?= $create_disable ?>" function="addRecord">
                                <i slot="icon" class="fas fa-plus-circle fa-lg"></i>
                            </fwk-button>

                            <!-- Botões para dropdown bulk -->
                            <fwk-button slot="table-bulk-action" value="Eliminar Selecionados" disable="<?= $delete_disable ?>" color="blue" function="confirmDeleteBulk">
                                <i slot="icon" class="fas fa-trash"></i>
                            </fwk-button>

                            <!-- Componentes para filtro -->

                            <!-- Botões de topo de filtro -->
                            <fwk-button id="filter_save" slot="filter-top-action" value="Gravar" color="blue" function="obj_filter_helper.confirmSave">
                                <i slot="icon" class="fas fa-save fa-lg"></i>
                            </fwk-button>
                            <fwk-button id="filter_delete" slot="filter-top-action" visible="false" value="Eliminar" color="blue" function="obj_filter_helper.confirmDelete">
                                <i slot="icon" class="fas fa-trash"></i>
                            </fwk-button>

                            <!-- Filtros gravados -->
                            <div slot="filter-component">
                                <fwk-label value="Filtro:"></fwk-label>
                                <fwk-select id="filter_id" key-value="id" key-text="name" placeholder="Selecione" width="250" function="obj_filter_helper.applySaved">
                                    <div slot="options">[]</div>
                                </fwk-select>
                            </div>

                            <!-- Pesquisa livre -->
                            <div slot="filter-component" style="padding-right: 10px;">
                                <fwk-label value="Pesquisa livre:"></fwk-label>
                                <fwk-input id="filter_search" type="text" placeholder="> 2 carateres" maxlength="50" width="250" tooltip-position="left">
                                    <span slot="information">Sobre as colunas:<br>NOME e DESCRIÇÃO</span>
                                </fwk-input>
                            </div>

                            <!-- Tipo -->
                            <div slot="filter-component">
                                <fwk-label value="Tipo:"></fwk-label>
                                <fwk-select id="role_system" key-value="value" key-text="description" placeholder="Todos" width="150">
                                    <div slot="options">[{"value": 0, "description":"Definida"},{"value": 1, "description":"Sistema"}]</div>
                                </fwk-select>
                            </div>

                            <!-- Estado -->
                            <div slot="filter-component">
                                <fwk-label value="Estado:"></fwk-label>
                                <fwk-select id="role_active" key-value="value" key-text="description" placeholder="Todos" width="150">
                                    <div slot="options">[{"value": 1, "description":"Ativa"},{"value": 0, "description":"Inativa"}]</div>
                                </fwk-select>
                            </div>

                            <!-- Acções  de filtro -->
                            <fwk-formbutton slot="filter-action" value="LIMPAR" color="white" function="resetFilterComponents"></fwk-formbutton>
                            <fwk-formbutton slot="filter-action" value="FILTRAR" color="gray" function="applyFilter"></fwk-formbutton>

                            <div slot="rows"><?= json_encode($table_rows, JSON_HEX_QUOT | JSON_HEX_TAG) ?></div>

                        </fwk-table>
                    </div>
                    <div class="component actions">
                        <button onclick="tbl_hide();">Hide</button>
                        <button onclick="tbl_show();">Show</button>
                        <button onclick="tbl_isHide();">? Hide</button>
                        <button onclick="tbl_disable();">Inactivo</button>
                        <button onclick="tbl_enable();">Activo</button>
                        <button onclick="tbl_isDisable();">? Inactivo</button>
                        <button onclick="tbl_tableData();">Dados</button>
                        <button onclick="tbl_fillRows();">Carregar (fill - rows)</button>
                        <button onclick="tbl_fillAjax();">Carregar (fill - ajax)</button>
                    </div>

                </div>
            </div>
        </fwk-htabs>

    </div>

</div>

<?php
$obj_page->render();
?>