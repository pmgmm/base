.. index:: Menu

.. _menu:

Menu
====

Este componente mostra e gere um menu.

.. image:: ../resources/menu.png

Requisitos
----------
         
=================================== ===============
``/framework/components/menu.js``
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-menu>
        <div slot="content">[{},{},...]</div>        
    </fwk-menu>

==================== ================================= =========== =============== =======
Atributo             Descrição                         Obrigatório Opções          Default
==================== ================================= =========== =============== =======
``id``               Identificador único do componente Sim (?)        
``disable``          Inibe componente                  Não         "true", "false" "false" 
``hide``             Esconde componente                Não         "true", "false" "false" 
``color``            Cor base do componente            Não         "blue", "gray"  "gray" 
==================== ================================= =========== =============== =======

.. important:: 

    O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

=========== ===================== =========== =============================
Slot        Descrição             Obrigatório Observações
=========== ===================== =========== =============================
``content`` Dados para componente Sim         :ref:`menu_content_data_slot`
=========== ===================== =========== =============================

----

.. _menu_content_data_slot:

Slot content
------------

A slot ``content`` é um array de objectos. Cada objecto corresponde a um menu parcial (isolado) e tem o seguinte formato:

.. code:: Javascript

  {"id": "???", main: ???, "value": "???", "disable": ???,
   "elements": [
        {"id": "???", "value": "???",  "action": "???", "target": "???", "disable": ???},
        ...
        ]
   }

=========== ======================================= =========== ==================== =======
Atributo    Descrição                               Obrigatório Opções               Default
=========== ======================================= =========== ==================== =======
``id``      Identificador único do menu ou elemento Sim
``main``    Menu de topo (principal)                Não         true, false          false
``value``   Texto do menu ou elemento               Sim  
``action``  Tipo de acção destino do elemento       Sim         "page", "menu"
``target``  Destino da acção do elemento            Sim         "Url/Uri", "id_menu" 
``disable`` Inibir menu ou elemento                 Não         true, false          false
=========== ======================================= =========== ==================== =======

.. important:: 

    O atributo ``target`` depende do atributo ``action``. Assim:

    * **page** -> Uri / Url;
    * **menu** -> id do menu (não main).

----

Exemplos
--------

Carregamento html
^^^^^^^^^^^^^^^^^
.. code:: html

    <fwk-menu id="fwk_menu">
        <div slot="content">[{"id": "administration", "main": true, "value": "ADMINISTRAÇÃO", "elements": [
                {"id": "administration_organization", "value": "ORGANIZAÇÃO", "action": "menu", "target": "organization"}, 
                {"id": "administration_apps", "value": "APPS / PWAS", "action": "page", "target": "/ui/admin/app/list.php" }] 
            },          
            {"id":"organization", "main": 1, "elements":[
                {"id":"organization_groups", "value":"GRUPOS", "disable": true, "action":"page", "target":"/ui/admin/group/list.php"},
                {"id":"organization_roles", "value":"FUNCÕES", "action":"page", "target":"/ui/admin/role/list.php"},
                {"id":"organization_permissions","value":"PERMISSÕES", "action":"page", "target":"/ui/admin/permission/list.php"},
                {"id":"organization_users", "value":"UTILIZADORES", "action":"page", "target":"/ui/admin/user/list.php"}]
            }]
        </div>     
    </fwk-menu>

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_menu = FormHelper.getComponent('fwk_menu');

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_menu.hide = false;
    obj_menu.hide = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_menu.hide;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.