<?php
/**
 * UI - REGISTO DE UTILIZADOR
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace UI\admin\user;

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \FWK\wrappers\repositories\MainRepository;
use \CORE\entities\user\User;
use \CORE\entities\group\Group;
use \CORE\entities\group\collections\GroupsByUser;
use \CORE\entities\role\Role;
use \CORE\entities\role\collections\RolesByUser;


final class _record {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {
            
            // Setup de página
            $obj_page = new PageHelper(PageHelper::FORM);
            $obj_page->setSubTitle('Utilizador');
            $obj_page->setCurrentMenu('administration');
            $obj_page->setCoreModule(MODULE_ADMINISTRATION);
            $obj_page->addScript('record.js');
            $obj_page->addStyleSheet('/framework/css/grid_form_data.css');

            // Define o valor do id pelo parâmetro do url
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;  

            // Permissões de página
            $permisson_operation = (boolval($id)) ? PermissionHelper::UPDATE : PermissionHelper::CREATE;
            // Sai se não tiver permissão
            // Recebe "modo view" se não existir permissão para udpdate 
            $view_mode = PermissionHelper::ValidateRecord(array('ADMINISTRATION', 'SUPPORT', 'USER'), $permisson_operation);

            // Inicialização de variáveis
            $system = false;
            $active = 1;
            $user = $name = $email = '';
            $notification_email = $notification_internal = 'false';
            $timezone = date_default_timezone_get();
            $language = $_SESSION['LANGUAGE']['current'];
            $date_format = $_SESSION['FORMAT']['date'];
            $breadcrumb = TH::translate('NOVO UTILIZADOR');
            $arr_user_groups = array();
            $arr_user_roles = array();

            // Repositório
            $repository = new MainRepository();

            // Carrega (se existir) o registo do utilizador
            if ($id > 0) {

                $obj_user = new User($repository);
                if ($obj_user->load_byID($id)) {
                    if ($view_mode) {
                        $breadcrumb = TH::translate('VER UTILIZADOR');
                    } else {
                        $breadcrumb = TH::translate('EDITAR UTILIZADOR');  
                    }
                    $user = $obj_user->getProperty('user');
                    $name = $obj_user->getProperty('name');
                    $email = $obj_user->getProperty('email');
                    $language = $obj_user->getProperty('language');
                    $timezone = $obj_user->getProperty('timezone');
                    $date_format = $obj_user->getProperty('date_format');
                    $notification_email = boolval($obj_user->getProperty('notification_email')) ? 'true' : 'false' ;
                    $notification_internal = boolval($obj_user->getProperty('notification_internal')) ? 'true' : 'false' ;
                    $system = boolval($obj_user->getProperty('_system'));
                    $avatar = $obj_user->getProperty('avatar');
                    $active = $obj_user->getProperty('active');

                    $obj_user_groups = new GroupsByUser($repository);
                    $obj_user_groups->load($id);
                    $arr_user_groups = $obj_user_groups->getRelationKeys();

                    $obj_user_roles = new RolesByUser($repository);
                    $obj_user_roles->load($id);
                    $arr_user_roles = $obj_user_roles->getRelationKeys();

                } else { // Se não exite, reinicializa o id (=0 para insert)
                    $id = 0;
                }

            }

            // Breadcrump
            $obj_page->setBreadcrumb($breadcrumb);

            // Variáveis View mode (campos ou form)
            $str_view_mode_or_system = ($view_mode || $system) ? 'true' : 'false';
            $str_view_mode = $view_mode ? 'true' : 'false';

            // Validações dependentes de insert / update
            $password_mandatory = ($id == 0) ? 'true' : 'false';

            // Array de timezones para slot
            $arr_timezones = array();
            foreach(timezone_identifiers_list() as $aux_timezone) {
                $arr_timezones[] = array('timezone' => $aux_timezone);
            }

            // Array de grupos para slot
            $obj_group = new Group($repository);
            $db_fields = array('id', 'name');
            $db_filter = array('active' => true);
            if (count($arr_user_groups)) {
                $db_filter['INCLUDE' ] = 'OR id in('.implode(',',$arr_user_groups).')';
            }
            $obj_order = array('name ASC');
            $obj_group->loadList($db_fields, null, $db_filter, $obj_order);
            $arr_groups = $obj_group->getList();

            // Array de funções para slot
            $obj_role = new Role($repository);
            $db_fields = array('id', 'name', 'active');
            $db_filter = array('active' => true);
            if (count($arr_user_roles)) {
                $db_filter['INCLUDE' ] = 'OR id in('.implode(',',$arr_user_roles).')';
            }
            $obj_order = array('name ASC');
            $obj_role->loadList($db_fields, null, $db_filter, $obj_order);
            $arr_roles = $obj_role->getList();

            // Inicia e carrega container body do template
            $obj_page->startContent('body');

            ?>

            <!-- baseado em "grid_form_data.css" carregado na página -->
            <div class="grid-structure two-columns">

                <!-- Coluna esquerda -->     
                <div class="grid-column">

                    <!-- Avatar -->
                    <?php if ($id==0) {?>
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Avatar')?>:"></fwk-label></div>
                    <?php } else {?>
                        <div class="grid-cell-label">
                        <fwk-image src="<?=$avatar?>" width="40" circle="true" border="1"></fwk-image>    
                    </div>
                    <?php }
                    if ($view_mode) {?>
                    <div></div>
                    <?php } else {?>
                    <div class="grid-cell-component">
                        <fwk-upload id="avatar" placeholder="<?=TH::translate('Selecione ou arraste ficheiro')?>" formats='[".jpg", ".png"]' max-size="<?=1024*100?>" disable="<?=$str_view_mode?>">
                            <span slot="information"><?=TH::translate('Selecione ou arraste ficheiro de imagem para área assinalada.<br>Formatos aceites: jpg, png<br>Forma: circulo ou quadrado<br>Tamanho máximo: 100kb')?></span>
                        </fwk-upload>
                    </div>
                    <?php }?>

                    <!-- Utilizador -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Utilizador')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="user" type="text" width="200" maxlength="25" value="<?=$user?>" placeholder="> 5 <?=TH::translate('carateres')?>" disable="<?=$str_view_mode_or_system?>">
                            <span slot="information"><?=TH::translate('CREDENCIAL DE LOGIN:<br>Pode ser gerado automáticamente (se vazio) ou inserido manualmente. <br>No login, pode ser substituído pelo email.')?></span>
                        </fwk-input>
                    </div>

                    <!-- Nome -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Nome')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="user_name" type="text" width="350" value="<?=$name?>" mandatory="true" disable="<?=$str_view_mode_or_system?>"></fwk-input>
                    </div>

                    <!-- Email -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Email')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="user_email" type="email" value="<?=$email?>" mandatory="true" disable="<?=$str_view_mode?>">
                            <span slot="information"><?=TH::translate('CREDENCIAL DE LOGIN:<br>No login, pode ser substituído pelo utilizador.')?></span>
                        </fwk-input>
                    </div>

                    <!--  Texto sobre password/confirmação se em modo de update -->
                    <?php if ($id>0 && !$view_mode) {?>
                    <div></div>
                    <div class="grid-cell-component">
                        <fwk-text color="blue" align="bottom">
                            <span slot="content"><?=TH::translate('Preencha a password se pretende alterar a já existente.');?></span>
                        </fwk-text>
                    </div>
                    <?php }?>   

                    <!-- Password -->
                    <?php if (!$view_mode) {?>
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Password')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="user_password" type="password" width="200" maxlength="25" mandatory="<?=$password_mandatory?>" placeholder="> 5 <?=TH::translate('carateres')?>" disable="<?=$str_view_mode?>">
                            <span slot="information"><?=TH::translate('CREDENCIAL DE LOGIN')?></span>
                        </fwk-input>
                    </div>

                    <!-- Confirmação -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Confirmação')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="user_password_confirmation" type="password" width="200" maxlength="25" mandatory="<?=$password_mandatory?>" disable="<?=$str_view_mode?>"></fwk-input>
                    </div>
                    <?php }?>  

                    <!-- Notificações -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Notificações')?>:"></fwk-label></div>
                    <div class="grid-cell-multi-component">
                        <fwk-checkbox id="user_notification_email" label="<?=TH::translate('Email')?>" value="<?=$notification_email?>" disable="<?=$str_view_mode?>"></fwk-checkbox>
                        <fwk-checkbox id="user_notification_internal" label="<?=TH::translate('Internas')?>" value="<?=$notification_internal?>" style="padding-left: 16px;" disable="<?=$str_view_mode?>"></fwk-checkbox>
                    </div>

                    <!-- Estado -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Estado')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-radiobutton id="user_active" key-value="id" key-text="description" value="<?=$active?>" disable="<?=$str_view_mode_or_system?>">
                            <div slot="options">[{"id": 1, "description":"<?=TH::translate('Ativo')?>"},{"id": 0, "description":"<?=TH::translate('Inativo')?>"}]</div>  
                        </fwk-radiobutton>
                    </div>

                </div>

                <!-- Coluna direita --> 
                <div class="grid-column">

                    <!-- Grupos -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Grupos')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-multiselect id="user_groups" key-value="id" key-text="name" placeholder="<?=TH::translate('Selecione')?>" value='<?=json_encode($arr_user_groups)?>' width="250" rows="12" filter="true" disable="<?=$str_view_mode_or_system?>">
                        <div slot="options"><?=json_encode($arr_groups)?></div>
                        </fwk-multiselect>
                    </div>

                    <!-- Funções -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Funções')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-multiselect id="user_roles" key-value="id" key-text="name" placeholder="<?=TH::translate('Selecione')?>" value='<?=json_encode($arr_user_roles)?>' width="250" rows="12" filter="true" mandatory="true" disable="<?=$str_view_mode_or_system?>">
                            <div slot="options"><?=json_encode($arr_roles)?></div>   
                        </fwk-multiselect>
                    </div>

                    <!-- linha vazia -->
                    <div class="grid-row"></div>

                    <!-- Timezone -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Timezone')?>:"></fwk-label></div>
                    <div slot="grid-cell-component">
                        <fwk-select id="user_timezone" key-value="timezone" key-text="timezone" placeholder="Placeholder" value="<?=$timezone?>" rows="8" filter="true" mandatory="true" disable="<?=$str_view_mode?>">
                        <span slot="information">???</span>
                            <div slot="options"><?=json_encode($arr_timezones)?></div>   
                        </fwk-select>
                    </div>

                    <!-- Idioma -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Idioma')?>:"></fwk-label></div>
                    <div slot="grid-cell-component">
                        <fwk-select id="user_language" key-value="code" key-text="description" placeholder="<?=TH::translate('Selecione')?>" value="<?=$language?>" rows="12" mandatory="true" disable="<?=$str_view_mode?>">
                            <div slot="options"><?=json_encode(AVAILABLE_LANGUAGES)?></div>
                        </fwk-select>
                    </div>  

                    <!-- Data -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Formato data')?>:"></fwk-label></div>
                    <div slot="grid-cell-component">
                        <fwk-select id="user_date_format" key-value="code" key-text="description" placeholder="<?=TH::translate('Selecione')?>" value="<?=$date_format?>" rows="12" mandatory="true" disable="<?=$str_view_mode?>">
                            <div slot="options"><?=json_encode(AVAILABLE_FORMATS_DATE)?></div>
                        </fwk-select>
                    </div>   

                </div>

            </div> 

            <?php

            // Inicia e carrega container body-actions do template
            $obj_page->startContent('body-actions'); 
            
            ?>

            <!-- Id do registo -->
            <input id="id" type="hidden" value="<?=$id?>"/>

            <!-- Botões -->
            <fwk-formbutton value="<?=TH::translate('VOLTAR')?>" color="white" function="back"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('LIMPAR')?>" color="white" function="newRecord" disable="<?=$str_view_mode?>"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('GRAVAR')?>" color="gray" function='{"saveRecord":[-1]}' disable="<?=$str_view_mode?>"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('GRAVAR')?> =" color="blue" function='{"saveRecord":[0]}' disable="<?=$str_view_mode?>"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('GRAVAR')?> +" color="blue" function='{"saveRecord":[1]}' disable="<?=$str_view_mode?>"></fwk-formbutton>

            <?php 

            // Render de página
            $obj_page->render();
            
        } catch (\Throwable $throwable) {
            $this->throwableHandle($throwable);
            header('location: ' . BASE_URI . 'home.php');
        }   
    }

}

// Instancia e processa
$obj = new _record();
$obj->run();
// --- END