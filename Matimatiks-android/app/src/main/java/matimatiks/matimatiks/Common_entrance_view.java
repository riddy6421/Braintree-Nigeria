package matimatiks.matimatiks;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.FrameLayout;
import android.widget.ListView;

import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.util.Arrays;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link Common_entrance_view.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link Common_entrance_view#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Common_entrance_view extends Fragment implements AdapterView.OnItemClickListener,ActivityActions {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private ListView listView;
    private FrameLayout.LayoutParams layoutParams;
    private OnFragmentInteractionListener mListener;
    private FirebaseStorage storage;
    private StorageReference storageRef;
    private int type,frag;

    /**
     * Set a hint for whether this fragment's menu should be visible.  This
     * is useful if you know that a fragment has been placed in your view
     * hierarchy so that the user can not currently seen it, so any menu items
     * it has should also not be shown.
     *
     * @param menuVisible The default is true, meaning the fragment's menu will
     *                    be shown as usual.  If false, the user will not see the menu.
     */
    @Override
    public void setMenuVisibility(boolean menuVisible) {
        super.setMenuVisibility(menuVisible);

        if(menuVisible)
            frag = 2;
    }

    public Common_entrance_view() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Waec_jamb_View.
     */
    // TODO: Rename and change types and number of parameters
    public static Common_entrance_view newInstance(String param1, String param2) {
        Common_entrance_view fragment = new Common_entrance_view();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }

        storageRef = FirebaseStorage.getInstance().getReference();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.common_entrance_view, container, false);

        String[]items = {"Algebra","Geometry","Statistics","Trigonometry"};

        Arrays.sort(items);

        listView = (ListView)view.findViewById(R.id.Common_entrance);

        ArrayAdapter<String> listviewAdapter = new ArrayAdapter<String>(getActivity()
                ,R.layout.support_simple_spinner_dropdown_item,items);

        listView.setAdapter(listviewAdapter);

        layoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,FrameLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.setMargins(0,(int)Profile.height,0,0);

        listView.setLayoutParams(layoutParams);

        return view;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onToppaidFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

        switch (i){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                Log.e("Error","Invalid Click");
                break;
        }

    }



    @Override
    public void getImage_A() {

    }

    @Override
    public void getImage_G() {

    }

    @Override
    public void getImage_S() {

    }

    @Override
    public void getImage_T() {

    }

    @Override
    public void getImage_F() {

    }

    @Override
    public void getImage_M() {

    }

    @Override
    public void getImage_N() {

    }

    @Override
    public void Showprogress() {

    }

    @Override
    public void Hideprogress() {

    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onToppaidFragmentInteraction(Uri uri);
    }
}
