from datetime import datetime
from pprint import pprint
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm.exc import UnmappedInstanceError
from app.models import db, Medical_Professional

mcp_routes = Blueprint('mcps', __name__)


# GET ALL MEDICAL CARE PROFESSIONALS (MCP)
# FUTURE JOSH, PLEASE LIMIT QUERY WITH SOME SORT OF ORDER
@mcp_routes.route('/')
@login_required
def mcps():
    get_all_mcps = Medical_Professional.query.all()
    all_mcps = {mcp.id: mcp.to_dict() for mcp in get_all_mcps}

    return all_mcps


# GET SINGLE MCP
@mcp_routes.route('/<int:mcp_id>')
@login_required
def mcp(mcp_id):
    try:
        mcp = Medical_Professional.query.get(mcp_id)

        return mcp.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# DELETE MCP
@mcp_routes.route('/', methods=['DELETE'])
@login_required
def del_mcp():
    try:
        mcp_id = request.json['mcpId']
        mcp = Medical_Professional.query.get(mcp_id)
        db.session.delete(mcp)
        db.session.commit()

        return {'message': 'Success.'}
    except AttributeError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# EDIT MCP
@mcp_routes.route('/', methods=['PATCH'])
@login_required
def edit_mcp():
    try:
        mcp_id = request.json['mcpId']
        mcp = Medical_Professional.query.get(mcp_id)

        new_name = request.json['mcpName']
        new_efax = request.json['efax']
        new_address = request.json['address']
        new_phone_num = request.json['phoneNumber']
        new_npi_num = request.json['npiNumber']

        if new_name:
            mcp.name = new_name
        if new_efax:
            mcp.efax = new_efax
        if new_address:
            mcp.address = new_address
        if new_phone_num:
            mcp.phone_number = new_phone_num
        if new_npi_num:
            mcp.npi_number = new_npi_num

        if (
            new_name or
            new_efax or
            new_address or
            new_phone_num or
            new_npi_num
        ):
            mcp.updated_at = datetime.now()
        db.session.commit()

        return mcp.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# ADD MCP
@mcp_routes.route('/', methods=['POST'])
@login_required
def add_mcp():
    try:
        # new_name = request.json['mcpName']
        # new_efax = request.json['efax']
        # new_address = request.json['address']
        # new_phone_num = request.json['phoneNumber']
        # new_npi_num = request.json['npiNumber']
        new_name = 'Dr. Who'
        new_efax = None
        new_address = 'Phone booth'
        new_phone_num = '555'
        new_npi_num = '209552'

        new_mcp = Medical_Professional(
            name=new_name,
            efax=new_efax,
            address=new_address,
            phone_number=new_phone_num,
            npi_number=new_npi_num
        )

        db.session.add(new_mcp)
        db.session.commit()

        return new_mcp.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Medical care professional does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500
